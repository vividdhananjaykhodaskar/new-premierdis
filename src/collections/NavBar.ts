import type { CollectionConfig } from 'payload'

/**
 * NavBar Collection - Admin-Only Management
 * 
 * Manages navigation menu items.
 * Public can read, only admins can modify.
 */
export const NavBar: CollectionConfig = {
  slug: 'nav-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'order', 'visible'],
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
      name: 'title',
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
      name: 'external',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether this link opens in a new tab' },
    },
  ],
}
