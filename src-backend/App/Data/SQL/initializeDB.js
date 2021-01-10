module.exports = `
-- Create Metadata Table

DROP TABLE IF EXISTS Metadata;

CREATE TABLE Metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    val TEXT
);

-- Create Preferences Table

DROP TABLE IF EXISTS Preferences;

CREATE TABLE Preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT NOT NULL,
    subgroups TEXT,
    label TEXT,
    val TEXT
);
`;
