import testFile from "./testFile.mjs";

/**
 * A test function for reading the sample files and comparing them to the originals.
 */
const run = async () => {
  await testFile("./sampleData/text.txt", "./testOutput/text.txt", (instance) => ({ bytes: instance.getText(), size: instance.getTextSize() }));
  await testFile("./sampleData/zip.zip", "./testOutput/zip.zip", (instance) => ({ bytes: instance.getZip(), size: instance.getZipSize() }));
};

run()
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
