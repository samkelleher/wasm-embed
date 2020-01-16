import * as fs from "fs";
import * as zip from "./zipEmbed";

const fsPromises = fs.promises;

async function write() {
  const pathOutput = "./zipNEW.zip";

  try {
    await fsPromises.writeFile(pathOutput, zip.zip);
  } catch (error) {
    console.error(`Failed to write at "${pathOutput}"`);
    console.error(error);
  }
}

write()
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
