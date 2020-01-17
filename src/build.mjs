import * as fs from "fs";

const fsPromises = fs.promises;

const dataPath = "./sampleData/";
const path = "./sampleData/zip.zip";
const pathOutput = "./assembly/embed.ts";
const templatePath = "./assembly/embed.template.ts";

const readfileString = async (path) => {
  let data;
  try {
    data = await fsPromises.readFile(path, { encoding: "utf8" });
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return null;
  }
  return data;
};

const readfile = async (path) => {
  let data;
  try {
    data = await fsPromises.readFile(path);
  } catch (error) {
    console.error(`Failed to read at "${path}"`);
    console.error(error);
    return null;
  }
  return data;
};

const getFiles = async (files) => {
  const result = [];

  for (const fileName of files) {
    const fileData = await readfile(`${dataPath}${fileName}`);
    result[fileName] = new Uint8Array(fileData).toString();
  }

  return result;
}

async function build() {
  const template = await readfileString(templatePath);
  const fileNameRegex = /\/\*\s*(\w+\.\w+)\s*\*\//gim;
  const fileMatches = [...template.matchAll(fileNameRegex)].map(match => match[1]);
  console.log(`Going to embed ${fileMatches.length} files (${fileMatches.join(", ")}).`);

  const files = await getFiles(fileMatches);

  const data = await readfile(path);
  const decodedString = new Uint8Array(data).toString();
  const withData = template.replace(fileNameRegex, (match, p1) => {
    return files[p1];
  });

  const result = `// Generated ${new Date().toISOString()}\n\n${withData}`;

  try {
    await fsPromises.writeFile(pathOutput, result);
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
