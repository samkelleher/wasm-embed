import fs from "fs";
const fsPromises = fs.promises;
import sha1 from "./sha1.mjs";
import loader from "@assemblyscript/loader";
import getModule from "./getModule.mjs";

/**
 * Take a file, extract it from the embed, and then compare it to the original to ensure they are identical.
 * @param original - The path to the original file.
 * @param output - The path to where the extracted test file will be saved.
 * @param extract - A callback function given an instance of the module to extract the bytes.
 * @returns {Promise<void>}
 */
export default async function testFile(original, output, extract) {
  const module = await getModule("./build/embed.wasm");
  const instance = await loader.instantiate(module);
  const { bytes, size, raw } = extract(instance);
  const zipInputHash = await sha1(original);
  const embeddedBytes = instance.__getUint8Array(raw);
  await fsPromises.writeFile(output, embeddedBytes);
  const zipOutputHash = await sha1(output);
  console.log(`[${original}] Found ${embeddedBytes.byteLength} bytes embedded with ${size} embedded size.`)
  console.log(`[${original}] Input:  ${zipInputHash}`);
  console.log(`[${original}] Output: ${zipOutputHash}`);
  console.log(`[${original}] ${zipInputHash === zipOutputHash ? "✅ File is exact" : "❌ File is different"}`);
};
