import fs from "fs";
import getInstance from "./getInstance.mjs";
const fsPromises = fs.promises;
import crypto from "crypto";

const sha1 = path => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha1')
  const rs = fs.createReadStream(path)
  rs.on('error', reject)
  rs.on('data', chunk => hash.update(chunk))
  rs.on('end', () => resolve(hash.digest('hex')))
})

const writeFile = async () => {
  const instance = await getInstance("./build/embed.wasm");
  try {
    const zipInputHash = await sha1("./sampleData/zip.zip");
    await fsPromises.writeFile("./testOutput/zip.zip", new Uint8Array(instance.zip));
    const zipOutputHash = await sha1("./testOutput/zip.zip");
    console.log(zipInputHash);
    console.log(zipOutputHash);
    console.log(zipInputHash === zipOutputHash);

    await fsPromises.writeFile("./testOutput/kitten.jpeg", new Uint8Array(instance.kitten));
  } catch (error) {
    console.error(error);
  }
};

writeFile()
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
