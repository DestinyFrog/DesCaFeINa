
CREATE TABLE dictionary (
	`_id` INTEGER PRIMARY KEY,
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`description` TEXT,
	`terms` JSON
);