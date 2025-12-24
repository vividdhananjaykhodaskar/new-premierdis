import type { CollectionConfig } from 'payload'

/**
 * WhatWeDo Collection - Admin-Only Management
 * 
 * Manages 'What We Do' section content.
 * Public can read, only admins can modify.
 */
export const WhatWeDo: CollectionConfig = {
  slug: 'what-we-do',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
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
    // Service item fields (one entry per service)
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Item title' },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Item subtitle' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Item description (also used as main section description if present on first item)' },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Item image' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { description: 'Display order' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this item is visible' },
    },

    // Main "What We Do" section fields (usually set on the first item)
    {
      name: 'mainTitle',
      type: 'text',
      admin: { description: 'Main section title (used only on first item)' },
    },
    {
      name: 'label',
      type: 'text',
      admin: { description: 'Small label shown above the main title (e.g., ONE-STOP SOLUTION)' },
    },
    {
      name: 'cta',
      type: 'text',
      admin: { description: 'Call-to-action text for the main section' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: { description: 'Optional video embed URL (e.g., https://www.youtube.com/embed/...)' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
