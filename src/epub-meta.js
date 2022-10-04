import EPub from "epub";

export function readEpubMeta(fpath) {
  return new Promise((resolve, reject) => {
    const epub = new EPub(fpath);
    epub
      .on("end", () => {
        resolve(epub.metadata);
      })
      .on("error", (err) => {
        reject(err);
      })
      .parse();
  });
}
