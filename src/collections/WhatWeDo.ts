import type { CollectionConfig } from 'payload'

/**
 * WhatWeDo Collection - Admin-Only Management
 * 
 * Manages 'What We Do' section content.
 * Public can read, only admins can modify.
 */
export const WhatWeDo: CollectionConfig = {
  slug: 'what-wedo-final',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'label', 'publishedAt'],
    description: 'Manage "What We Do" section items',
  },
  timestamps: true,
  access: {
    // Public can read section items
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
      admin: { description: 'Small label shown above the main title (e.g., ONE-STOP SOLUTION)' },
    },
    {
      name: 'title',
      type: 'text',
      admin: { description: 'Main section title (e.g., What we do)' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Main description text' },
    },
    {
      name: 'cta',
      type: 'text',
      admin: { description: 'Call-to-action text (e.g., Call us for a guided demonstration)' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: { description: 'YouTube embed URL (e.g., https://www.youtube.com/embed/A0hbkovu_F8)' },
    },
    {
      name: 'buttonText',
      type: 'text',
      admin: { description: 'Button text (e.g., Check out our live demo site)' },
    },
    {
      name: 'buttonUrl',
      type: 'text',
      admin: { description: 'Button URL/link' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this section is active/visible' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
