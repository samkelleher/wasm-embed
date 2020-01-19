import * as fs from "fs";

const fsPromises = fs.promises;

export default async function getModule(path) {
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return;
  }

  return new WebAssembly.Module(new Uint8Array(data));
}
