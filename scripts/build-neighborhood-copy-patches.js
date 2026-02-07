/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const {getCliClient} = require('sanity/cli')

const client = getCliClient({apiVersion: '2024-06-01'})

const DATA = {
  'Park West': {
    summary:
      'Park West is a master-planned community in north Mount Pleasant known for a strong amenity network and day-to-day convenience. Residents have access to community pools, tennis courts, trails, and a community dock, plus the nearby Park West Recreation Complex with fields, courts, and a lake pavilion. It reads as a true live-play neighborhood with outdoor infrastructure woven into everyday life.',
    overview:
      'Park West is a professionally managed, planned community with a wide range of home styles and neighborhood pockets, unified by shared amenities and a strong outdoor lifestyle. The HOA amenities include pools, tennis, clubhouse space, and a community dock, while the Town of Mount Pleasant Park West Recreation Complex adds city-level sports fields, courts, trails, and a lake pavilion. Together they create a rare mix of private and public recreation in one location.',
    lifestyle:
      'Life in Park West feels active and connected. Trails link neighborhoods to parks and amenities, and the recreation complex expands that network with fields and courts that encourage daily outdoor routines. It’s a strong fit for buyers who value community amenities, walkable recreation, and a social rhythm built around parks and outdoor spaces.',
    faqs: [
      {
        q: 'What makes Park West stand out locally?',
        a: 'Park West combines HOA-run amenities with the town-operated Park West Recreation Complex in one connected area, creating a true park-centric lifestyle rather than a neighborhood with only a single pool or clubhouse.',
      },
      {
        q: 'What are the signature amenities in Park West?',
        a: 'Expect community pools, tennis courts, clubhouse space, a community dock, and an extensive trail network, plus public fields and courts at the Park West Recreation Complex.',
      },
      {
        q: 'How’s the market in Park West right now?',
        a: 'As of {{statsMonth}}, the median listing price is {{medianListingPrice}} with a {{medianListingPriceYoY}} YoY shift and median days on market around {{medianDaysOnMarket}}. Inventory is {{activeListingCount}} active listings, which helps frame pace and negotiating leverage.',
      },
      {
        q: 'Is Park West connected to public recreation?',
        a: 'Yes. The Park West Recreation Complex is adjacent to the community and adds public fields, courts, trails, and a lake pavilion, reinforcing the outdoor-first feel of the neighborhood.',
      },
    ],
  },
  'Dunes West': {
    summary:
      'Dunes West is a gated, Lowcountry-style community along the Wando River with trails, community docks, and a residents’ pavilion. The Club at Dunes West adds a country-club lifestyle with pools, tennis, fitness, and the Dunes West Golf & River Club. It’s defined by water access, mature landscaping, and a resort-leaning feel.',
    overview:
      'Dunes West is an upscale community set along the Wando River in Mount Pleasant. POA amenities include walking and biking trails, two community docks, a playground, and a covered pavilion. For residents who want a full club lifestyle, The Club at Dunes West offers pools, tennis, fitness, and the Dunes West Golf & River Club.',
    lifestyle:
      'The vibe is private, landscaped, and outdoors-forward. River access and community docks create a distinct Lowcountry experience, while the golf and athletic club adds a social, resort-like rhythm for those who choose membership.',
    faqs: [
      {
        q: 'What local landmark defines Dunes West?',
        a: 'The Dunes West Golf & River Club anchors the community and shapes much of the lifestyle for residents who join the club.',
      },
      {
        q: 'Does Dunes West have river access?',
        a: 'Yes. The POA lists two community docks on the Wando River along with trails, a pavilion, and a playground.',
      },
      {
        q: 'How’s the market in Dunes West right now?',
        a: 'As of {{statsMonth}}, median listing price is {{medianListingPrice}}, with {{medianListingPriceYoY}} YoY and {{medianDaysOnMarket}} median days on market. Current inventory is {{activeListingCount}} listings, which indicates pace and supply.',
      },
      {
        q: 'Is Dunes West gated?',
        a: 'Yes. Dunes West is a gated community with a dedicated POA and private amenity structure.',
      },
    ],
  },
  'Carolina Park': {
    summary:
      'Carolina Park is a master-planned community in north Mount Pleasant built around neighborhood connectivity, parks, and shared amenities. The layout emphasizes walkable streets, trails, and community gathering spaces, with newer construction throughout. It stands out for buyers who want modern homes and a planned, park-forward lifestyle without sacrificing proximity to Mount Pleasant conveniences.',
    overview:
      'Carolina Park is a large, master-planned community designed for walkable neighborhoods, shared amenities, and a balanced mix of public and private outdoor space. The planning emphasizes connectivity and recreation, creating a cohesive community feel that’s distinct from more piecemeal suburban development.',
    lifestyle:
      'Carolina Park feels modern, active, and community-oriented. Residents gravitate to parks, trails, and amenity spaces, and the neighborhood design encourages daily routines built around outdoor life and nearby conveniences.',
    faqs: [
      {
        q: 'What makes Carolina Park distinct in Mount Pleasant?',
        a: 'It’s one of the area’s larger master-planned communities, with intentional street layouts, shared amenities, and a park-forward design that encourages walkability and a connected neighborhood feel.',
      },
      {
        q: 'What local amenities define the lifestyle here?',
        a: 'Carolina Park is shaped by community amenities, trails, and recreation spaces that support an outdoor-first routine for residents.',
      },
      {
        q: 'How’s the market in Carolina Park right now?',
        a: 'As of {{statsMonth}}, median listing price is {{medianListingPrice}} with {{medianListingPriceYoY}} YoY and {{medianDaysOnMarket}} median days on market. Inventory sits at {{activeListingCount}} active listings.',
      },
      {
        q: 'What types of homes are typical in Carolina Park?',
        a: 'The community is known for newer construction and a mix of single-family homes within a planned neighborhood setting.',
      },
    ],
  },
}

function block(text) {
  return [
    {
      _type: 'block',
      style: 'normal',
      children: [{_type: 'span', text}],
    },
  ]
}

function faqItems(items) {
  return items.map(({q, a}) => ({
    _type: 'faqItem',
    _key: uuid(),
    question: q,
    answer: a,
  }))
}

function uuid() {
  return uuidv4()
}

function uuidv4() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function main() {
  const names = Object.keys(DATA)
  const docs = await client.fetch(
    '*[_type == \"neighborhood\" && name in $names]{_id,name}',
    {names}
  )

  const byName = new Map(docs.map((d) => [d.name, d._id]))

  const patches = []
  for (const name of names) {
    const id = byName.get(name)
    if (!id) {
      console.warn(`Missing neighborhood in Sanity: ${name}`)
      continue
    }
    const entry = DATA[name]
    patches.push({
      patch: {
        id,
        set: {
          summary: entry.summary,
          overview: block(entry.overview),
          lifestyle: block(entry.lifestyle),
          faqs: faqItems(entry.faqs),
        },
      },
    })
  }

  const outPath = path.resolve(
    '/Users/veronicaengelage/Projects/veronica-website/neighborhood-copy-patches.ndjson'
  )
  fs.writeFileSync(outPath, patches.map((p) => JSON.stringify(p)).join('\\n') + '\\n')
  console.log(`Wrote ${patches.length} patch(es) to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
