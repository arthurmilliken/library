SELECT meta.SHA256, doc.Path, doc.Filename, doc.Extension
FROM Metadata meta
INNER JOIN Documents doc ON meta.SHA256 = doc.SHA256
left outer join EPUB ON meta.SHA256 = EPUB.SHA256
where meta.MIME = 'application/epub+zip'
and EPUB.SHA256 IS NULL;
