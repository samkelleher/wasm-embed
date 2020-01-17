import * as fs from "fs";

const fsPromises = fs.promises;

const path = "./build/optimized.wasm";
// const path = "./build/untouched.wasm";
// const path = "./build/optimized.wat";

async function run() {
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return;
  }

  const lib = await WebAssembly.instantiate(new Uint8Array(data), {}).then(res => res.instance.exports);

  return lib;
}

run()
  .then((file) => {
    console.log("Finished");
    console.log(file);
  })
  .catch((err) => {
    console.log(err);
  });
