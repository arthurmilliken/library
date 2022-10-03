CREATE TABLE Documents (
  Path TEXT NOT NULL PRIMARY KEY,
  Filename TEXT,
  Extension TEXT,
  Created TEXT,
  SHA256 TEXT
);
CREATE INDEX idx_Documents_Filename ON Documents(Filename, Extension);
CREATE INDEX idx_Documents_Extension ON Documents(Extension, Path);
CREATE INDEX idx_Documents_Created ON Documents(Created, Path);
CREATE INDEX idx_Documents_SHA256 ON Documents(SHA256);

CREATE TABLE Metadata (
  SHA256 TEXT NOT NULL PRIMARY KEY,
  SHA1 TEXT,
  MD5 TEXT,
  MIME TEXT,
  Size TEXT,
  Metadata TEXT
);
CREATE INDEX idx_Metadata_SHA1 ON Metadata(SHA1);
CREATE INDEX idx_Metadata_MD5 ON Metadata(MD5);
CREATE INDEX idx_Metadata_MIME ON Metadata(MIME);
CREATE INDEX idx_Metadata_Size ON Metadata(Size);

CREATE TABLE Formats (
  MIME TEXT NOT NULL PRIMARY KEY,
  Name TEXT
);
CREATE INDEX idx_Formats_Name ON Formats(Name);

CREATE TABLE Labels (
  MIME TEXT NOT NULL,
  Name TEXT NOT NULL,
  Datatype TEXT,
  Sort INTEGER,
  PRIMARY KEY(MIME, Name)
);
CREATE INDEX idx_Labels_Name ON Labels(Name);
CREATE INDEX idx_Labels_Sort ON Labels(MIME, Sort);

CREATE TABLE Tags (
  SHA256 TEXT NOT NULL,
  Name TEXT NOT NULL,
  Value TEXT NOT NULL,
  Sort INTEGER,
  PRIMARY KEY(SHA256, Name, Value)
);
CREATE INDEX idx_Tags_Name ON Tags(Name, SHA256, Sort);
CREATE INDEX idx_Tags_Sort ON Tags(SHA256, Sort);

CREATE TABLE TagsInt (
  SHA256 TEXT NOT NULL,
  Name TEXT NOT NULL,
  ValueInt INTEGER NOT NULL,
  Sort INTEGER,
  PRIMARY KEY(SHA256, Name, ValueInt)
);
CREATE INDEX idx_TagsInt_Name ON TagsInt(Name, SHA256, Sort);
CREATE INDEX idx_TagsInt_Sort ON TagsInt(SHA256, Sort);

CREATE TABLE TagsReal (
  SHA256 TEXT NOT NULL,
  Name TEXT NOT NULL,
  ValueReal REAL NOT NULL,
  Sort INTEGER,
  PRIMARY KEY(SHA256, Name, ValueReal)
);
CREATE INDEX idx_TagsReal_Name ON TagsReal(Name, SHA256, Sort);
CREATE INDEX idx_TagsReal_Sort ON TagsReal(SHA256, Sort);

CREATE TABLE PDF (
  SHA256 TEXT NOT NULL PRIMARY KEY,
  Title TEXT,
  Author TEXT,
  Subject TEXT,
  Creator TEXT,
  Keywords TEXT,
  Producer TEXT,
  Created TEXT,
  Modified TEXT
);
CREATE INDEX idx_PDF_Title ON PDF(Title);
CREATE INDEX idx_PDF_Author ON PDF(Author);
CREATE INDEX idx_PDF_Subject ON PDF(Subject, Title);
CREATE INDEX idx_PDF_Creator ON PDF(Creator, Title);
CREATE INDEX idx_PDF_Keywords ON PDF(Keywords);
CREATE INDEX idx_PDF_Producer ON PDF(Producer, Title);
CREATE INDEX idx_PDF_Created ON PDF(Created);
CREATE INDEX idx_PDF_Modified ON PDF(Modified);
