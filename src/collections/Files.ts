import type { CollectionConfig } from 'payload'

export const Files: CollectionConfig = {
  slug: 'files',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Upload and manage arbitrary files',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
  ],
  upload: {
    // Keep defaults; worker environment uses R2 configured in wrangler.jsonc
    crop: false,
    focalPoint: false,
  },
}

export default Files
