module.exports = `
-- Create Metadata Table

DROP TABLE IF EXISTS Metadata;

CREATE TABLE Metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    val TEXT
);
`;
