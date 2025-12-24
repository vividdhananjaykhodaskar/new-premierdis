import type { CollectionConfig } from 'payload'

/**
 * Features Collection - Admin-Only Management
 * 
 * Manages feature list items.
 * Public can read, only admins can modify.
 */
export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
    description: 'Manage feature items',
  },
  timestamps: true,
  access: {
    // Public can read features
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
      admin: { description: 'Feature title' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Feature description' },
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Icon class or identifier' },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Feature image' },
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
      admin: { description: 'Whether this feature is visible' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
