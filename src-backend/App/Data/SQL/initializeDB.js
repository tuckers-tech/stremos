module.exports = `
DROP TABLE IF EXISTS Metadata;

CREATE TABLE Metadata (
    id INTEGER PRIMARY KEY,
    label TEXT,
    val TEXT
);

DROP TABLE IF EXISTS Preferences;

CREATE TABLE Preferences (
    id INTEGER PRIMARY KEY,
    group_name TEXT NOT NULL,
    subgroups TEXT,
    label TEXT,
    val TEXT
);
`;
