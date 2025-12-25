import type { CollectionConfig } from 'payload'

/**
 * ContactUs Collection - Admin-Only Management
 * 
 * Stores contact form submissions.
 * Public can read (for listing), but only admins can manage.
 */
export const ContactUs: CollectionConfig = {
  slug: 'contact-us-content',
  admin: {
    useAsTitle: 'headerTitle',
    defaultColumns: ['headerTitle', 'isSiteContent', 'createdAt'],
    description: 'Site-managed contact page content (separate from user submissions)',
  },
  timestamps: true,
  access: {
    // Public can read the site content, only admins can create/update/delete
    read: () => true,
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    // Flag to distinguish site content documents from user submissions
    {
      name: 'isSiteContent',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Set to true for the site-managed contact info (admin only)' },
    },

    // Site content fields (only used when `isSiteContent` is true)
    {
      name: 'headerTitle',
      type: 'text',
      admin: { description: 'Main header title for the contact page' },
    },
    {
      name: 'headerSubtitle',
      type: 'textarea',
      admin: { description: 'Header subtitle/paragraph' },
    },

    // Left card (location)
    {
      name: 'locationTitle',
      type: 'text',
      admin: { description: 'Location card title (e.g., Drop us a line)' },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: { description: 'Address HTML/text for the location card. Use <br/> or newlines to separate lines; frontend splits on <br/> or \n.' },
    },
    {
      name: 'addressLines',
      type: 'array',
      admin: { description: 'Structured address lines (preferred). Each entry is a single line; frontend will render each on its own line.' },
      fields: [
        {
          name: 'line',
          type: 'text',
          admin: { description: 'One address line' },
        },
      ],
    },
    {
      name: 'seeMapLink',
      type: 'text',
      admin: { description: 'URL for See Map link' },
    },

    // Email card
    {
      name: 'emailTitle',
      type: 'text',
      admin: { description: 'Email card title (e.g., Email)' },
    },
    {
      name: 'emailAddress',
      type: 'text',
      admin: { description: 'Public contact email address' },
    },
    {
      name: 'emailLink',
      type: 'text',
      admin: { description: 'mailto: link or other URL for the email card' },
    },

    // Phone card
    {
      name: 'phoneTitle',
      type: 'text',
      admin: { description: 'Phone card title (e.g., Call)' },
    },
    {
      name: 'phoneNumbers',
      type: 'textarea',
      admin: { description: 'Phone numbers text (can include multiple numbers separated by <br/> or newlines). Frontend splits on <br/> or \n.' },
    },
    {
      name: 'phoneList',
      type: 'array',
      admin: { description: 'Structured phone numbers (preferred). Each entry can have a label and a number.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Optional label for the phone number (e.g., Local, Toll Free)' },
        },
        {
          name: 'number',
          type: 'text',
          admin: { description: 'Phone number string (displayed as-is)' },
        },
      ],
    },
    {
      name: 'phoneLink',
      type: 'text',
      admin: { description: 'tel: link or other URL for phone action' },
    },
    
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this submission is active/visible in the admin list' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time or handled time' },
    },
  ],
}
