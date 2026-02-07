/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const {getCliClient} = require('sanity/cli')

const client = getCliClient({apiVersion: '2024-06-01'})

function loadMutations(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const lines = raw.split(/\r?\n/).filter(Boolean)
  const mutations = []

  for (const line of lines) {
    const obj = JSON.parse(line)
    if (obj && Array.isArray(obj.mutations)) {
      mutations.push(...obj.mutations)
    } else {
      mutations.push(obj)
    }
  }

  return mutations
}

async function applyBatches(mutations, batchSize = 50) {
  let applied = 0
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize)
    await client.mutate(batch, {visibility: 'async'})
    applied += batch.length
    console.log(`Applied ${applied}/${mutations.length} mutations...`)
  }
}

async function main() {
  const fileArg = process.argv[2]
  if (!fileArg) {
    console.error('Usage: npx sanity exec scripts/apply-ndjson-mutations.js --with-user-token -- <ndjson>')
    process.exit(1)
  }
  const filePath = path.resolve(fileArg)
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const mutations = loadMutations(filePath)
  if (!mutations.length) {
    console.log('No mutations found. Nothing to apply.')
    return
  }

  await applyBatches(mutations, 50)
  console.log(`Done. Applied ${mutations.length} mutations.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
