import * as fs from "fs";

const fsPromises = fs.promises;
const path = "./build/optimized.wasm";

const getInstance = async () => {
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
};

const writeFile = async (data) => {
  const instance = await getInstance();
  try {
    await fsPromises.writeFile("./testOutput/zip-output.zip", new Uint8Array(instance.getZip()));
    await fsPromises.writeFile("./testOutput/kitten-output.jpeg", new Uint8Array(instance.getKitten()));
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
