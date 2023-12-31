-- sqlite
-- UP
CREATE TABLE BLOG (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    subject VARCHAR(255) NOT NULL,
    content text NOT NULL,
    createdBy VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NULL DEFAULT NULL,
    deletedAt DATETIME NULL DEFAULT NULL,
    isDeleted TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TRIGGER blog_updated_at
AFTER UPDATE ON BLOG
FOR EACH ROW
BEGIN
    UPDATE BLOG SET updatedAt = CURRENT_TIMESTAMP WHERE id = old.id;
END;

-- Down
DROP TABLE BLOG;