import type { CollectionConfig } from 'payload'

/**
 * ContactSubmissions Collection - stores public form submissions
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions-form',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'createdAt'],
    description: 'Public contact form submissions',
  },
  timestamps: true,
  access: {
    // Public may create submissions; read/update/delete restricted to admins
    read: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    create: () => true,
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Contact person name' },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      admin: { description: 'Contact email address' },
    },
    {
      name: 'subject',
      type: 'text',
      admin: { description: 'Message subject' },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { description: 'Message content' },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Optional contact phone number' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether the submission is active' },
    },
  ],
}
