import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_hero_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_headline\` text,
  	\`version_subheadline\` text,
  	\`version_cta_text\` text,
  	\`version_cta_url\` text,
  	\`version_background_id\` integer,
  	\`version_active\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`hero\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_hero_v_parent_idx\` ON \`_hero_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_version_version_background_idx\` ON \`_hero_v\` (\`version_background_id\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_version_version_updated_at_idx\` ON \`_hero_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_version_version_created_at_idx\` ON \`_hero_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_version_version__status_idx\` ON \`_hero_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_created_at_idx\` ON \`_hero_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_updated_at_idx\` ON \`_hero_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_v_latest_idx\` ON \`_hero_v\` (\`latest\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`subheadline\` text,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`background_id\` integer,
  	\`active\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_hero\`("id", "headline", "subheadline", "cta_text", "cta_url", "background_id", "active", "updated_at", "created_at", "_status") SELECT "id", "headline", "subheadline", "cta_text", "cta_url", "background_id", "active", "updated_at", "created_at", "_status" FROM \`hero\`;`)
  await db.run(sql`DROP TABLE \`hero\`;`)
  await db.run(sql`ALTER TABLE \`__new_hero\` RENAME TO \`hero\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`hero_background_idx\` ON \`hero\` (\`background_id\`);`)
  await db.run(sql`CREATE INDEX \`hero_updated_at_idx\` ON \`hero\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_created_at_idx\` ON \`hero\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`hero__status_idx\` ON \`hero\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_hero_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_hero\` (
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
  await db.run(sql`INSERT INTO \`__new_hero\`("id", "headline", "subheadline", "cta_text", "cta_url", "background_id", "active", "updated_at", "created_at") SELECT "id", "headline", "subheadline", "cta_text", "cta_url", "background_id", "active", "updated_at", "created_at" FROM \`hero\`;`)
  await db.run(sql`DROP TABLE \`hero\`;`)
  await db.run(sql`ALTER TABLE \`__new_hero\` RENAME TO \`hero\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`hero_background_idx\` ON \`hero\` (\`background_id\`);`)
  await db.run(sql`CREATE INDEX \`hero_updated_at_idx\` ON \`hero\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_created_at_idx\` ON \`hero\` (\`created_at\`);`)
}
