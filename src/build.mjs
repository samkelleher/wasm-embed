import * as fs from "fs";

const fsPromises = fs.promises;

const path = "./sampleData/zip.zip";
const pathOutput = "./assembly/embed.ts";

async function build() {
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return;
  }

  const decodedString = new Uint8Array(data).toString();
  const template = `// Generated ${new Date().toISOString()}\n\nexport const zip: u8[] = [${decodedString}];\n`;

  try {
    data = await fsPromises.writeFile(pathOutput, template);
  } catch (error) {
    console.error(`Failed to write at "${path}"`);
    console.error(error);
  }
}

build()
  .then(() => {
    console.log(`Files embedded in ${pathOutput}`);
  })
  .catch((err) => {
    console.log(err);
  });
