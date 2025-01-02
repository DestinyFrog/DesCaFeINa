
CREATE TABLE `molecula` (
	`_id` INTEGER PRIMARY KEY,
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`IUPAC_name` TEXT,
	`another_names` JSON,
	`characteristics` JSON,
	`xyz` TEXT,
	`organic` TEXT
);

INSERT INTO `molecula` (`IUPAC_name`, `xyz`, `organic`, `ànother_names`, `characteristics`)
VALUES
('água', 'O 0 0 0\nH 0.79068957 0.61221728 0\nH -0.79068957 0.61221728 0', 'inorgânico','["dióxido de hidrogênio"]', '["óxido"]')
;