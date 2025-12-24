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
    useAsTitle: 'copyrightMessage',
    defaultColumns: ['copyrightMessage', 'createdAt'],
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
      name: 'sections',
      type: 'array',
      admin: { description: 'Footer sections with links' },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Section label/title' },
        },
        {
          name: 'links',
          type: 'array',
          admin: { description: 'Links in this section' },
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: { description: 'Link text' },
            },
            {
              name: 'url',
              type: 'text',
              admin: { description: 'Link URL' },
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightMessage',
      type: 'text',
      admin: { description: 'Copyright message (e.g., "Made with love for great people.")' },
    },
    {
      name: 'copyrightYear',
      type: 'text',
      admin: { description: 'Copyright text (e.g., "© Copyright 2024 - JCAR LLC dba Premier...")' },
    },
  ],
}
