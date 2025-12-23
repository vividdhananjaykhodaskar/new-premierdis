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
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Item title' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Item description' },
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
  ],
}
