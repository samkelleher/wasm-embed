import fs from "fs";

const fsPromises = fs.promises;

async function build() {
    const path = "./zip.zip";
    let data;
    try {
        data = await fsPromises.readFile(path);
    } catch (error) {
        console.error(`Failed to read report at "${path}"`);
        console.error(error);
        return;
    }

    console.log(data.toString());
}

build()
    .then(() => {
        console.log("Finished");
    })
    .catch(err => {
        console.log(err);
    })