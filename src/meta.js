import { stat, readFile } from "fs/promises";
import { parse } from "path";
import { createHash } from "crypto";
import { fileTypeFromBuffer } from "file-type";

export async function parseMeta(fpath) {
  try {
    const fstat = await stat(fpath);
    const parsed = parse(fpath);
    const buffer = await readFile(fpath);
    const sha256 = createHash("sha256").update(buffer).digest("hex");
    const sha1 = createHash("sha1").update(buffer).digest("hex");
    const md5 = createHash("md5").update(buffer).digest("hex");
    const ftype = await fileTypeFromBuffer(buffer);

    return {
      path: fpath,
      filename: parsed.name,
      extension: parsed.ext,
      created: fstat.ctime.toISOString(),
      sha256,
      sha1,
      md5,
      mime: ftype?.mime || (parsed.ext === ".txt" ? "text/plain" : null),
      size: fstat.size,
    };
  } catch (err) {
    console.error({ fpath, err });
    throw err;
  }
}
