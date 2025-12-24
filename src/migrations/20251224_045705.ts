import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`footer_sections_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_sections_links_order_idx\` ON \`footer_sections_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_sections_links_parent_id_idx\` ON \`footer_sections_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_sections_order_idx\` ON \`footer_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_sections_parent_id_idx\` ON \`footer_sections\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`footer_links\`;`)
  await db.run(sql`ALTER TABLE \`features\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`features\` DROP COLUMN \`summary\`;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`copyright_message\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`copyright_year\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`content\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`position\`;`)
  await db.run(sql`ALTER TABLE \`nav_items\` ADD \`label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`nav_items\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` ADD \`subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` ADD \`main_title\` text;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` DROP COLUMN \`summary\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`url\` text,
  	\`order\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_links_order_idx\` ON \`footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_links_parent_id_idx\` ON \`footer_links\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`footer_sections_links\`;`)
  await db.run(sql`DROP TABLE \`footer_sections\`;`)
  await db.run(sql`ALTER TABLE \`features\` ADD \`summary\` text;`)
  await db.run(sql`ALTER TABLE \`features\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`content\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`position\` text DEFAULT 'bottom';`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`copyright_message\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`copyright_year\`;`)
  await db.run(sql`ALTER TABLE \`nav_items\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`nav_items\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` ADD \`summary\` text;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` DROP COLUMN \`subtitle\`;`)
  await db.run(sql`ALTER TABLE \`what_we_do\` DROP COLUMN \`main_title\`;`)
}
