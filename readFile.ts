import * as fs from "fs";

const fsPromises = fs.promises;

async function build() {
    const path = "./zip.zip";
    const pathOutput = "./zipEmbed.ts";
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return;
  }

  // const decodedString = new TextEncoder().encode(data);
  // console.log(data.toString());
    const decodedString = new Uint8Array(data).toString();

  const template = `export const zip: u8[] = [${decodedString}];`;
  console.log(template);

    try {
        data = await fsPromises.writeFile(pathOutput, template);
    } catch (error) {
        console.error(`Failed to write at "${path}"`);
        console.error(error);
        return;
    }
}

build()
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
