-- sqlite
-- UP
CREATE TABLE IMAGE (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    uid text NOT NULL,
    originalName text NOT NULL,
    saveName text NOT NULL,
    url text NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NULL DEFAULT NULL,
    deletedAt DATETIME NULL DEFAULT NULL,
    isDeleted TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TRIGGER image_updated_at
AFTER UPDATE ON IMAGE
FOR EACH ROW
BEGIN
    UPDATE IMAGE SET updatedAt = CURRENT_TIMESTAMP WHERE id = old.id;
END;

-- Down
DROP TABLE IMAGE;