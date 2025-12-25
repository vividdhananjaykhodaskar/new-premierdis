import type { CollectionConfig } from 'payload'

/**
 * Footer Collection - Admin-Only Management
 * 
 * Manages footer content sections.
 * Public can read, only admins can modify.
 */
export const Footer: CollectionConfig = {
  slug: 'footer-final',
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
      name: 'titleLines',
      type: 'array',
      admin: { description: 'Title lines displayed in the footer CTA (eg:-Ready to get started with). Each entry is a single line.' },
      fields: [
        {
          name: 'line',
          type: 'text',
          admin: { description: 'One title line' },
        },
      ],
    },
    {
      name: 'titleSpans',
      type: 'array',
      admin: { description: 'Just like(Premier?).' },
      fields: [
        {
          name: 'text',
          type: 'text',
          admin: { description: 'Span text' },
        },
      ],
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      admin: { description: 'CTA button text displayed in the footer (e.g., Get a Consultation)' },
    },
    {
      name: 'ctaButtonUrl',
      type: 'text',
      admin: { description: 'CTA button URL (optional)' },
    },
    {
      name: 'copyrightYear',
      type: 'text',
      admin: { description: 'Copyright text (e.g., "© Copyright 2024 - JCAR LLC dba Premier...")' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this footer is active/public' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
