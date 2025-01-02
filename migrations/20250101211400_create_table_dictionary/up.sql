
CREATE TABLE dicionary (
	`_id` INTEGER PRIMARY KEY,
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`description` TEXT,
	`terms` JSON
);