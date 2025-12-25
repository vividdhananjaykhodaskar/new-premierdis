import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`contact_us_content_address_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_us_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_content_address_lines_order_idx\` ON \`contact_us_content_address_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_content_address_lines_parent_id_idx\` ON \`contact_us_content_address_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_us_content_phone_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`number\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_us_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_content_phone_list_order_idx\` ON \`contact_us_content_phone_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_content_phone_list_parent_id_idx\` ON \`contact_us_content_phone_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_us_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_site_content\` integer DEFAULT false,
  	\`header_title\` text,
  	\`header_subtitle\` text,
  	\`location_title\` text,
  	\`address\` text,
  	\`see_map_link\` text,
  	\`email_title\` text,
  	\`email_address\` text,
  	\`email_link\` text,
  	\`phone_title\` text,
  	\`phone_numbers\` text,
  	\`phone_link\` text,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_content_updated_at_idx\` ON \`contact_us_content\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_content_created_at_idx\` ON \`contact_us_content\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_submissions_form\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`subject\` text,
  	\`message\` text NOT NULL,
  	\`phone\` text,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_submissions_form_email_idx\` ON \`contact_submissions_form\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_form_updated_at_idx\` ON \`contact_submissions_form\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_form_created_at_idx\` ON \`contact_submissions_form\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`features_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`features_final_image_idx\` ON \`features_final\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`features_final_updated_at_idx\` ON \`features_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`features_final_created_at_idx\` ON \`features_final\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`footer_final_sections_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_final_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_final_sections_links_order_idx\` ON \`footer_final_sections_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_final_sections_links_parent_id_idx\` ON \`footer_final_sections_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_final_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_final\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_final_sections_order_idx\` ON \`footer_final_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_final_sections_parent_id_idx\` ON \`footer_final_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_final_title_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_final\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_final_title_lines_order_idx\` ON \`footer_final_title_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_final_title_lines_parent_id_idx\` ON \`footer_final_title_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_final_title_spans\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_final\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_final_title_spans_order_idx\` ON \`footer_final_title_spans\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_final_title_spans_parent_id_idx\` ON \`footer_final_title_spans\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`copyright_message\` text,
  	\`cta_button_text\` text,
  	\`cta_button_url\` text,
  	\`copyright_year\` text,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_final_updated_at_idx\` ON \`footer_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`footer_final_created_at_idx\` ON \`footer_final\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hero_final_subtitle_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hero_final\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hero_final_subtitle_lines_order_idx\` ON \`hero_final_subtitle_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hero_final_subtitle_lines_parent_id_idx\` ON \`hero_final_subtitle_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hero_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_premier\` text,
  	\`subtext\` text,
  	\`cta_text\` text,
  	\`image_id\` integer,
  	\`active\` integer DEFAULT false,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`hero_final_image_idx\` ON \`hero_final\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`hero_final_updated_at_idx\` ON \`hero_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_final_created_at_idx\` ON \`hero_final\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_final__status_idx\` ON \`hero_final\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_hero_final_v_version_subtitle_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`line\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_hero_final_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_subtitle_lines_order_idx\` ON \`_hero_final_v_version_subtitle_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_subtitle_lines_parent_id_idx\` ON \`_hero_final_v_version_subtitle_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_hero_final_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title_premier\` text,
  	\`version_subtext\` text,
  	\`version_cta_text\` text,
  	\`version_image_id\` integer,
  	\`version_active\` integer DEFAULT false,
  	\`version_published_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`hero_final\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_hero_final_v_parent_idx\` ON \`_hero_final_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_version_image_idx\` ON \`_hero_final_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_version_updated_at_idx\` ON \`_hero_final_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_version_created_at_idx\` ON \`_hero_final_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_version_version__status_idx\` ON \`_hero_final_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_created_at_idx\` ON \`_hero_final_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_updated_at_idx\` ON \`_hero_final_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_hero_final_v_latest_idx\` ON \`_hero_final_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`navbar_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`order\` numeric,
  	\`visible\` integer DEFAULT true,
  	\`is_site_settings\` integer DEFAULT false,
  	\`logo_text\` text,
  	\`logo_image_id\` integer,
  	\`external\` integer DEFAULT false,
  	\`is_button\` integer DEFAULT false,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_final_logo_image_idx\` ON \`navbar_final\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`navbar_final_updated_at_idx\` ON \`navbar_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`navbar_final_created_at_idx\` ON \`navbar_final\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`what_wedo_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`main_title\` text,
  	\`label\` text,
  	\`cta\` text,
  	\`video_url\` text,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`what_wedo_final_updated_at_idx\` ON \`what_wedo_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`what_wedo_final_created_at_idx\` ON \`what_wedo_final\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`services_final\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`icon_id\` integer NOT NULL,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_final_icon_idx\` ON \`services_final\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`services_final_updated_at_idx\` ON \`services_final\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_final_created_at_idx\` ON \`services_final\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`contact_us\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions\`;`)
  await db.run(sql`DROP TABLE \`features\`;`)
  await db.run(sql`DROP TABLE \`footer_sections_links\`;`)
  await db.run(sql`DROP TABLE \`footer_sections\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`hero\`;`)
  await db.run(sql`DROP TABLE \`_hero_v\`;`)
  await db.run(sql`DROP TABLE \`nav_items\`;`)
  await db.run(sql`DROP TABLE \`what_we_do\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`contact_us_content_id\` integer,
  	\`contact_submissions_form_id\` integer,
  	\`features_final_id\` integer,
  	\`footer_final_id\` integer,
  	\`hero_final_id\` integer,
  	\`navbar_final_id\` integer,
  	\`what_wedo_final_id\` integer,
  	\`services_final_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_us_content_id\`) REFERENCES \`contact_us_content\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_form_id\`) REFERENCES \`contact_submissions_form\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`features_final_id\`) REFERENCES \`features_final\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`footer_final_id\`) REFERENCES \`footer_final\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hero_final_id\`) REFERENCES \`hero_final\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`navbar_final_id\`) REFERENCES \`navbar_final\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`what_wedo_final_id\`) REFERENCES \`what_wedo_final\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_final_id\`) REFERENCES \`services_final\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "contact_us_content_id", "contact_submissions_form_id", "features_final_id", "footer_final_id", "hero_final_id", "navbar_final_id", "what_wedo_final_id", "services_final_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "contact_us_content_id", "contact_submissions_form_id", "features_final_id", "footer_final_id", "hero_final_id", "navbar_final_id", "what_wedo_final_id", "services_final_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_us_content_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_us_content_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_form_i_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_form_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_features_final_id_idx\` ON \`payload_locked_documents_rels\` (\`features_final_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_footer_final_id_idx\` ON \`payload_locked_documents_rels\` (\`footer_final_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hero_final_id_idx\` ON \`payload_locked_documents_rels\` (\`hero_final_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_navbar_final_id_idx\` ON \`payload_locked_documents_rels\` (\`navbar_final_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_what_wedo_final_id_idx\` ON \`payload_locked_documents_rels\` (\`what_wedo_final_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_final_id_idx\` ON \`payload_locked_documents_rels\` (\`services_final_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`contact_us\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_site_content\` integer DEFAULT false,
  	\`header_title\` text,
  	\`header_subtitle\` text,
  	\`location_title\` text,
  	\`address\` text,
  	\`see_map_link\` text,
  	\`email_title\` text,
  	\`email_address\` text,
  	\`email_link\` text,
  	\`phone_title\` text,
  	\`phone_numbers\` text,
  	\`phone_link\` text,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_updated_at_idx\` ON \`contact_us\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_us_created_at_idx\` ON \`contact_us\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`subject\` text,
  	\`message\` text NOT NULL,
  	\`phone\` text,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_submissions_email_idx\` ON \`contact_submissions\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`features\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`features_image_idx\` ON \`features\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`features_updated_at_idx\` ON \`features\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`features_created_at_idx\` ON \`features\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`copyright_message\` text,
  	\`copyright_year\` text,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_updated_at_idx\` ON \`footer\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`footer_created_at_idx\` ON \`footer\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`subheadline\` text,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`background_id\` integer,
  	\`active\` integer DEFAULT false,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`hero_background_idx\` ON \`hero\` (\`background_id\`);`)
  await db.run(sql`CREATE INDEX \`hero_updated_at_idx\` ON \`hero\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hero_created_at_idx\` ON \`hero\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`hero__status_idx\` ON \`hero\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_hero_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_headline\` text,
  	\`version_subheadline\` text,
  	\`version_cta_text\` text,
  	\`version_cta_url\` text,
  	\`version_background_id\` integer,
  	\`version_active\` integer DEFAULT false,
  	\`version_published_at\` text,
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
  await db.run(sql`CREATE TABLE \`nav_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`order\` numeric,
  	\`visible\` integer DEFAULT true,
  	\`external\` integer DEFAULT false,
  	\`active\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`nav_items_updated_at_idx\` ON \`nav_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`nav_items_created_at_idx\` ON \`nav_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`what_we_do\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`order\` numeric,
  	\`active\` integer DEFAULT true,
  	\`main_title\` text,
  	\`label\` text,
  	\`cta\` text,
  	\`video_url\` text,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`what_we_do_image_idx\` ON \`what_we_do\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`what_we_do_updated_at_idx\` ON \`what_we_do\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`what_we_do_created_at_idx\` ON \`what_we_do\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`contact_us_content_address_lines\`;`)
  await db.run(sql`DROP TABLE \`contact_us_content_phone_list\`;`)
  await db.run(sql`DROP TABLE \`contact_us_content\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions_form\`;`)
  await db.run(sql`DROP TABLE \`features_final\`;`)
  await db.run(sql`DROP TABLE \`footer_final_sections_links\`;`)
  await db.run(sql`DROP TABLE \`footer_final_sections\`;`)
  await db.run(sql`DROP TABLE \`footer_final_title_lines\`;`)
  await db.run(sql`DROP TABLE \`footer_final_title_spans\`;`)
  await db.run(sql`DROP TABLE \`footer_final\`;`)
  await db.run(sql`DROP TABLE \`hero_final_subtitle_lines\`;`)
  await db.run(sql`DROP TABLE \`hero_final\`;`)
  await db.run(sql`DROP TABLE \`_hero_final_v_version_subtitle_lines\`;`)
  await db.run(sql`DROP TABLE \`_hero_final_v\`;`)
  await db.run(sql`DROP TABLE \`navbar_final\`;`)
  await db.run(sql`DROP TABLE \`what_wedo_final\`;`)
  await db.run(sql`DROP TABLE \`services_final\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`contact_us_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`features_id\` integer,
  	\`footer_id\` integer,
  	\`hero_id\` integer,
  	\`nav_items_id\` integer,
  	\`what_we_do_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_us_id\`) REFERENCES \`contact_us\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`features_id\`) REFERENCES \`features\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`footer_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hero_id\`) REFERENCES \`hero\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nav_items_id\`) REFERENCES \`nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`what_we_do_id\`) REFERENCES \`what_we_do\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "contact_us_id", "contact_submissions_id", "features_id", "footer_id", "hero_id", "nav_items_id", "what_we_do_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "contact_us_id", "contact_submissions_id", "features_id", "footer_id", "hero_id", "nav_items_id", "what_we_do_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_us_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_us_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_features_id_idx\` ON \`payload_locked_documents_rels\` (\`features_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_footer_id_idx\` ON \`payload_locked_documents_rels\` (\`footer_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hero_id_idx\` ON \`payload_locked_documents_rels\` (\`hero_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_nav_items_id_idx\` ON \`payload_locked_documents_rels\` (\`nav_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_what_we_do_id_idx\` ON \`payload_locked_documents_rels\` (\`what_we_do_id\`);`)
}
