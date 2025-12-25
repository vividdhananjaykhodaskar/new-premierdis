import type { CollectionConfig } from 'payload'

/**
 * Services Collection - Admin-Only Management
 * 
 * Manages service offerings with icon and description.
 * Public can read, only admins can modify.
 */
export const Services: CollectionConfig = {
  slug: 'services-final',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
    description: 'Manage service offerings',
  },
  timestamps: true,
  access: {
    // Public can read services
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
      admin: { description: 'Service title' },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      admin: { description: 'Service subtitle' },
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: { description: 'Service icon image' },
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
      admin: { description: 'Whether this service is visible' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
