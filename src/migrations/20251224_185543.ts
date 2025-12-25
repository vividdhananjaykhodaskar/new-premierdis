import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`what_wedo_final\` RENAME COLUMN "main_title" TO "title";`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` ADD \`button_text\` text;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` ADD \`button_url\` text;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` ADD \`active\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`features_final\` ADD \`main_title\` text;`)
  await db.run(sql`ALTER TABLE \`features_final\` ADD \`main_subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`hero_final\` ADD \`cta_url\` text;`)
  await db.run(sql`ALTER TABLE \`_hero_final_v\` ADD \`version_cta_url\` text;`)
  await db.run(sql`ALTER TABLE \`services_final\` ADD \`subtitle\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services_final\` DROP COLUMN \`description\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`features_final\` DROP COLUMN \`main_title\`;`)
  await db.run(sql`ALTER TABLE \`features_final\` DROP COLUMN \`main_subtitle\`;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` ADD \`main_title\` text;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` DROP COLUMN \`button_text\`;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` DROP COLUMN \`button_url\`;`)
  await db.run(sql`ALTER TABLE \`what_wedo_final\` DROP COLUMN \`active\`;`)
  await db.run(sql`ALTER TABLE \`services_final\` ADD \`description\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services_final\` DROP COLUMN \`subtitle\`;`)
  await db.run(sql`ALTER TABLE \`hero_final\` DROP COLUMN \`cta_url\`;`)
  await db.run(sql`ALTER TABLE \`_hero_final_v\` DROP COLUMN \`version_cta_url\`;`)
}
