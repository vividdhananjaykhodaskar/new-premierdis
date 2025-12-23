import type { CollectionConfig } from 'payload'

/**
 * Hero Collection - Admin-Only Management
 * 
 * Manages hero section content.
 * Public can read, only admins can modify.
 */
export const Hero: CollectionConfig = {
  slug: 'hero',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'subheadline', 'active'],
    description: 'Manage hero section content',
  },
  timestamps: true,
  access: {
    // Public can read hero content
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: { description: 'Main hero headline' },
    },
    {
      name: 'subheadline',
      type: 'text',
      admin: { description: 'Subheading text' },
    },
    {
      name: 'ctaText',
      type: 'text',
      admin: { description: 'Call-to-action button text' },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: { description: 'Call-to-action button URL' },
    },
    {
      name: 'background',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Hero background image' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this hero section is visible' },
    },
  ],
}
