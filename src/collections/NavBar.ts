import type { CollectionConfig } from 'payload'

/**
 * NavBar Collection - Admin-Only Management
 * 
 * Manages navigation menu items.
 * Public can read, only admins can modify.
 */
export const NavBar: CollectionConfig = {
  slug: 'navbar-final',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'url', 'order', 'visible'],
    description: 'Manage navigation menu items',
  },
  timestamps: true,
  access: {
    // Public can read nav items
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Menu item text' },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'Menu item link URL' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { description: 'Display order in menu' },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this menu item is visible' },
    },
    {
      name: 'isSiteSettings',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark this document as site settings (store logoText/logoImage here). Only one settings doc is recommended.' },
    },
    {
      name: 'logoText',
      type: 'text',
      admin: { description: 'Optional site logo text used when this document is marked as site settings' },
    },
    {
      name: 'logoImage',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Optional site logo image used when this document is marked as site settings' },
    },
    {
      name: 'external',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether this link opens in a new tab' },
    },
    {
      name: 'isButton',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Display as a button instead of a link (e.g., Free Trial)' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether this nav item is active (preferred over visible)' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}
