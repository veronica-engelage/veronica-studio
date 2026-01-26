import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Veronica Website',

  projectId: 'uyzjzo0o',
  dataset: 'production',

  plugins: [
    deskTool({structure: deskStructure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
