import type { CollectionConfig } from 'payload'

/**
 * Media Collection - Admin-Only File Uploads
 * 
 * Stores images and files uploaded via R2.
 * Only admins can upload/delete media.
 * Publicly readable (for serving content).
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'createdAt'],
  },
  access: {
    // Public can read/list media (to serve on frontend)
    read: () => true,
    // Only admins can upload
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    // Only admins can update/delete
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  upload: {
    // Disabled on Workers due to lack of sharp support
    crop: false,
    focalPoint: false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this media item is visible/public' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
  timestamps: true,
}
