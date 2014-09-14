CREATE TABLE `MOVIE` (
	`id`	INTEGER NOT NULL DEFAULT '0' PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`href`	TEXT,
	`post_url`	TEXT,
	`director`	TEXT,
	`type`	TEXT,
	`country`	TEXT,
	`visited`	Boolean DEFAULT 'False'
);