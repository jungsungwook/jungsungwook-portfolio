-- UP
PRAGMA foreign_keys=off;

-- Create a temporary table with the desired schema
CREATE TABLE BLOG_GUESTBOOK_LOG_TEMP (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    userId text,
    ip text,
    contents text NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NULL DEFAULT NULL,
    deletedAt DATETIME NULL DEFAULT NULL,
    isDeleted TINYINT(1) NOT NULL DEFAULT 0
);

-- Copy data from the original table to the temporary table
INSERT INTO BLOG_GUESTBOOK_LOG_TEMP SELECT * FROM BLOG_GUESTBOOK_LOG;

-- Drop the original table
DROP TABLE BLOG_GUESTBOOK_LOG;

-- Rename the temporary table to the original table name
ALTER TABLE BLOG_GUESTBOOK_LOG_TEMP RENAME TO BLOG_GUESTBOOK_LOG;

PRAGMA foreign_keys=on;

-- Down
-- This is a simple rollback; you may need to adjust it based on your specific requirements
DROP TABLE BLOG_GUESTBOOK_LOG;