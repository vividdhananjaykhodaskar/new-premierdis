import type { CollectionConfig } from 'payload'

/**
 * Hero Collection - Admin-Only Management
 *
 * Manages hero section content.
 * Public can read, only admins can modify.
 *
 * Behavior:
 * - When a hero document is saved with `active: true`, all other hero
 *   documents are unset (active: false) so the frontend can fetch the
 *   single active hero.
 * - Hook uses `req` and a `context` flag to avoid recursive updates and
 *   maintain transactional safety.
 */
export const Hero: CollectionConfig = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'subheadline', 'active'],
    description: 'Manage hero section content',
  },
  timestamps: true,
  versions: {
    drafts: true,
  },
  access: {
    // Public can read hero content
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  hooks: {
    afterChange: [
      async ({ req, doc, context }) => {
        // Avoid acting when this operation was triggered by our hook updates
        if (context?.skipHeroHooks) return

        try {
          if (!doc) return

          // Only proceed when the saved document is marked active
          if (doc.active) {
            // Find other active hero docs excluding current
            const otherActive = await req.payload.find({
              collection: 'hero',
              where: {
                and: [
                  { active: { equals: true } },
                  { id: { not_equals: doc.id } },
                ],
              },
              depth: 0,
            })

            if (otherActive?.docs?.length) {
              // Use the same `req` to keep operations in the same context/transaction
              await Promise.all(
                otherActive.docs.map((other) =>
                  req.payload.update({
                    collection: 'hero',
                    id: other.id,
                    data: { active: false },
                    req,
                    // prevent those updates from triggering this hook again
                    context: { skipHeroHooks: true },
                  }),
                ),
              )
            }
          }
        } catch (err) {
          req.payload.logger?.error?.(`Hero afterChange hook error: ${err instanceof Error ? err.message : String(err)}`)
        }
      },
    ],
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
      defaultValue: false,
      admin: { description: 'Whether this hero section is visible (only one active at a time)' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { description: 'Optional publication date/time' },
    },
  ],
}

export default Hero
