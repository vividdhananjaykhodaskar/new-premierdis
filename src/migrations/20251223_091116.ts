import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_us\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`subject\` text,
  	\`message\` text NOT NULL,
  	\`phone\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_email_idx\` ON \`contact_us\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_updated_at_idx\` ON \`contact_us\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_created_at_idx\` ON \`contact_us\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`features\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`summary\` text,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`features_image_idx\` ON \`features\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`features_updated_at_idx\` ON \`features\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`features_created_at_idx\` ON \`features\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`content\` text,
  	\`position\` text DEFAULT 'bottom',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_updated_at_idx\` ON \`footer\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`footer_created_at_idx\` ON \`footer\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`subheadline\` text,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`background_id\` integer,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`hero_background_idx\` ON \`hero\` (\`background_id\`);`)
  await db.run(sql`CREATE INDEX \`hero_updated_at_idx\` ON \`hero\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_created_at_idx\` ON \`hero\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`nav_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`order\` numeric,
  	\`visible\` integer DEFAULT true,
  	\`external\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`nav_items_updated_at_idx\` ON \`nav_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`nav_items_created_at_idx\` ON \`nav_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`what_we_do\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`summary\` text,
  	\`image_id\` integer,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`what_we_do_image_idx\` ON \`what_we_do\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`what_we_do_updated_at_idx\` ON \`what_we_do\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`what_we_do_created_at_idx\` ON \`what_we_do\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`contact_us_id\` integer REFERENCES contact_us(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`features_id\` integer REFERENCES features(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`footer_id\` integer REFERENCES footer(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`hero_id\` integer REFERENCES hero(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`nav_items_id\` integer REFERENCES nav_items(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`what_we_do_id\` integer REFERENCES what_we_do(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_us_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_us_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_features_id_idx\` ON \`payload_locked_documents_rels\` (\`features_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_footer_id_idx\` ON \`payload_locked_documents_rels\` (\`footer_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hero_id_idx\` ON \`payload_locked_documents_rels\` (\`hero_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_nav_items_id_idx\` ON \`payload_locked_documents_rels\` (\`nav_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_what_we_do_id_idx\` ON \`payload_locked_documents_rels\` (\`what_we_do_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`contact_us\`;`)
  await db.run(sql`DROP TABLE \`features\`;`)
  await db.run(sql`DROP TABLE \`footer_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`hero\`;`)
  await db.run(sql`DROP TABLE \`nav_items\`;`)
  await db.run(sql`DROP TABLE \`what_we_do\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
