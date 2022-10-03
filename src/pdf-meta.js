import { readFile } from "fs/promises";
import { PDFDocument } from "pdf-lib";

const FILE_PATH =
  "W:\\ARTHUR\\Media\\DoomsdayAlexandria\\Annie Besant - Esoteric Christianity.pdf";

export async function readPdfMeta(fpath) {
  const buf = await readFile(fpath);
  const doc = await PDFDocument.load(buf, { updateMetadata: false });
  const meta = {
    title: doc.getTitle(),
    author: doc.getAuthor(),
    subject: doc.getSubject(),
    creator: doc.getCreator(),
    keywords: doc.getKeywords(),
    producer: doc.getProducer(),
    created: doc.getCreationDate(),
    modified: doc.getModificationDate(),
  };
  console.log({ meta });
}

readPdfMeta(FILE_PATH);
