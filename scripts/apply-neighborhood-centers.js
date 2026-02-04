import fs from "node:fs";
import path from "node:path";
import sanityClient from "@sanity/client";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: npx sanity exec scripts/apply-neighborhood-centers.js --with-user-token -- /path/to/neighborhood-centers-patch.ndjson");
  process.exit(1);
}

const abs = path.resolve(filePath);
if (!fs.existsSync(abs)) {
  console.error("File not found:", abs);
  process.exit(1);
}

const raw = fs.readFileSync(abs, "utf8");
const lines = raw.split("\n").filter(Boolean);

const mutations = lines.map((line) => JSON.parse(line));
const batch = mutations.map((m) => ({ patch: m.patch }));

const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("No SANITY_AUTH_TOKEN found. Run with: npx sanity exec ... --with-user-token -- <file>");
  process.exit(1);
}

const projectId = "uyzjzo0o";
const dataset = "production";

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: "2023-05-03",
  token,
  useCdn: false,
});

async function run() {
  const res = await client.mutate(batch, { visibility: "async" });
  console.log("Applied patches:", res?.results?.length || batch.length);
}

run().catch((err) => {
  console.error("Mutation failed:", err);
  process.exit(1);
});
