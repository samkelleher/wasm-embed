import fs from "fs";
import getInstance from "./getInstance.mjs";
const fsPromises = fs.promises;
import sha1 from "./sha1.mjs";

const testFile = async (original, output, extract) => {
  const instance = await getInstance("./build/embed.wasm");
  const { bytes, size } = extract(instance);
  const zipInputHash = await sha1(original);
  const embeddedBytes = new Uint8Array(bytes);
  await fsPromises.writeFile(output, embeddedBytes);
  const zipOutputHash = await sha1(output);
  console.log(`[${original}] Found ${embeddedBytes.byteLength} bytes embedded with ${size} embedded size.`)
  console.log(`[${original}] Input:  ${zipInputHash}`);
  console.log(`[${original}] Output: ${zipOutputHash}`);
  console.log(`[${original}] ${zipInputHash === zipOutputHash ? "✅ File is exact" : "❌ File is different"}`);
};

testFile("./sampleData/text.txt", "./testOutput/text.txt", (instance) => ({ bytes: instance.getText(), size: instance.getTextSize() }))
  // .then(() => testFile("./sampleData/zip.zip", "./testOutput/zip.zip", (instance) => ({ bytes: instance.getZip(), size: instance.getZipSize() })))
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
