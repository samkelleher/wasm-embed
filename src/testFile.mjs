import fs from "fs";
import getInstance from "./getInstance.mjs";
const fsPromises = fs.promises;
import sha1 from "./sha1.mjs";

/** Copies a typed array's values from the module's memory. */
function getUint8Array(ptr, buffer) {
  return new Uint8Array(getTypedArrayView(ptr, buffer));
}

const SIZE_OFFSET = -4;
const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;

/** Gets a live view on a typed array's values in the module's memory. */
function getTypedArrayView(ptr, buffer) {
  const alignLog2 = 0;
  const U32 = new Uint32Array(buffer);
  const bufPtr = U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
  return new Uint8Array(buffer, bufPtr, U32[bufPtr + SIZE_OFFSET >>> 2] >>> alignLog2);
}

/**
 * Take a file, extract it from the embed, and then compare it to the original to ensure they are identical.
 * @param original - The path to the original file.
 * @param output - The path to where the extracted test file will be saved.
 * @param extract - A callback function given an instance of the module to extract the bytes.
 * @returns {Promise<void>}
 */
export default async function testFile(original, output, extract) {
  const zipInputHash = await sha1(original);

  // Get WASM module
  const instance = await getInstance("./build/embed.wasm");

  // Read from WASM the PTR and the file size
  const { size, raw } = extract(instance);

  const embeddedBytes = getUint8Array(raw, instance.memory.buffer);
  await fsPromises.writeFile(output, embeddedBytes);
  const zipOutputHash = await sha1(output);
  console.log(`[${original}] Found ${embeddedBytes.byteLength} bytes embedded with ${size} embedded size.`)
  console.log(`[${original}] Input:  ${zipInputHash}`);
  console.log(`[${original}] Output: ${zipOutputHash}`);
  console.log(`[${original}] ${zipInputHash === zipOutputHash ? "✅ File is exact" : "❌ File is different"}`);
};
