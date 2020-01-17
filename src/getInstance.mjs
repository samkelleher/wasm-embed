import * as fs from "fs";

const fsPromises = fs.promises;

export default async function(path) {
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return;
  }

  const compiled = new WebAssembly.Module(new Uint8Array(data));

  const imports = {
    env: {
      abort(_msg, _file, line, column) {
        console.error(`abort called at index.ts:${line}:${column}`);
      },
    },
  };

  return new WebAssembly.Instance(compiled, imports).exports;
}
