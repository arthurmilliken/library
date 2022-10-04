REPLACE INTO Documents (
  Path,
  Filename,
  Extension,
  Created,
  SHA256
)
VALUES (?, ?, ?, ?, ?);