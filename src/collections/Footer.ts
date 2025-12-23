import type { CollectionConfig } from 'payload'

/**
 * Footer Collection - Admin-Only Management
 * 
 * Manages footer content sections.
 * Public can read, only admins can modify.
 */
export const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'position'],
    description: 'Manage footer sections and links',
  },
  timestamps: true,
  access: {
    // Public can read footer content
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Section label/title' },
    },
    {
      name: 'content',
      type: 'richText',
      admin: { description: 'Footer section content' },
    },
    {
      name: 'links',
      type: 'array',
      admin: { description: 'Links within this footer section' },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: { description: 'Link text' },
        },
        {
          name: 'url',
          type: 'text',
          admin: { description: 'Link URL' },
        },
        {
          name: 'order',
          type: 'number',
          admin: { description: 'Display order' },
        },
      ],
    },
    {
      name: 'position',
      type: 'select',
      options: [
        { label: 'Bottom', value: 'bottom' },
        { label: 'Side', value: 'side' },
      ],
      defaultValue: 'bottom',
      admin: { description: 'Footer section position' },
    },
  ],
}
