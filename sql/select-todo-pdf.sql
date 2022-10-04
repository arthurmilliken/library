select meta.SHA256, doc.Path, doc.Filename, doc.Extension
from Metadata meta
inner join Documents doc on meta.SHA256 = doc.SHA256
left outer join PDF on meta.SHA256 = PDF.SHA256
where meta.MIME = 'application/pdf'
and PDF.SHA256 IS NULL;
