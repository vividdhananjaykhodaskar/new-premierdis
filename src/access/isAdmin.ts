import type { Access } from 'payload'

/**
 * Admin-only access control
 * 
 * Returns true only if the user is authenticated AND has the 'admin' role
 */
export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') ?? false
}

/**
 * Authenticated user access control
 * 
 * Returns true only if the user is authenticated
 */
export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * Public access (no authentication required)
 */
export const isPublic: Access = () => true
