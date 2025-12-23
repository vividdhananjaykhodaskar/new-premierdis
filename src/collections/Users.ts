import type { CollectionConfig } from 'payload'

/**
 * Users Collection - Admin Authentication
 * 
 * Admin-only authentication. Only admins can:
 * - Create new users
 * - Update user roles
 * - Delete users
 * 
 * Users can only update their own password/profile.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Anyone authenticated can read user list (basic operations)
    read: ({ req: { user } }) => Boolean(user),
    // Only admins can create users
    create: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
    // Only admins can update other users; users can update themselves
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (user.roles?.includes('admin')) return true
      // User can only update their own profile
      return user.id === id
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: [],
      required: true,
      saveToJWT: true, // Critical: Include roles in JWT for fast access checks
      access: {
        // Only admins can assign/change roles
        update: ({ req: { user } }) => (user?.roles?.includes('admin')) ?? false,
      },
      admin: {
        description: 'Admin users can create, edit, and delete content',
      },
    },
  ],
}
