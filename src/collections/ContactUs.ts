import type { CollectionConfig } from 'payload'

/**
 * ContactUs Collection - Admin-Only Management
 * 
 * Stores contact form submissions.
 * Public can read (for listing), but only admins can manage.
 */
export const ContactUs: CollectionConfig = {
  slug: 'contact-us',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'subject', 'createdAt'],
    description: 'Manage contact form submissions',
  },
  timestamps: true,
  access: {
    // Public can read and create contact submissions (form submissions)
    read: () => true,
    create: () => true,
    // Only admins can update/delete
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Contact person name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      admin: {
        description: 'Contact email address',
      },
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        description: 'Message subject',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Message content',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Optional contact phone number',
      },
    },
  ],
}
