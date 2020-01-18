import fs from "fs";
import crypto from "crypto";

/**
 * Given a file path, return the SHA-1 hash. Used to compare files.
 * @param path - The path of a file to examine.
 * @returns {Promise<string>} - The SHA-1 hash of the given file.
 */
export default function (path) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha1");
    const rs = fs.createReadStream(path);
    rs.on("error", reject);
    rs.on("data", chunk => hash.update(chunk));
    rs.on("end", () => resolve(hash.digest("hex")));
  });
}
