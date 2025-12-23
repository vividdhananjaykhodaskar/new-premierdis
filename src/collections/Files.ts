import type { CollectionConfig } from 'payload'

/**
 * Files Collection - Admin-Only Management
 * 
 * Stores downloadable files (PDFs, documents, etc.) via R2.
 * Public can read/download, only admins can upload/delete.
 */
export const Files: CollectionConfig = {
  slug: 'files',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'title', 'filesize', 'createdAt'],
    description: 'Upload and manage downloadable files',
  },
  access: {
    // Public can read/download files
    read: () => true,
    // Only admins can upload
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    // Only admins can update/delete
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: { description: 'File title or name' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: { description: 'File description' },
    },
  ],
  upload: {
    // Disabled on Workers due to lack of sharp support
    crop: false,
    focalPoint: false,
  },
  timestamps: true,
}
