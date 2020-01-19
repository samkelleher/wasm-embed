import testFile from "./testFile.mjs";
import testFileWithLoader from "./testFileWithLoader.mjs";

/**
 * A test function for reading the sample files and comparing them to the originals.
 */
const run = async () => {
  await testFile("./sampleData/text.txt", "./testOutput/text.txt", (instance) => ({ raw: instance.text, size: instance.getTextSize() }));
  await testFile("./sampleData/zip.zip", "./testOutput/zip.zip", (instance) => ({ raw: instance.zip, size: instance.getZipSize() }));
  await testFile("./sampleData/kitten.jpeg", "./testOutput/kitten.jpeg", (instance) => ({ raw: instance.kitten, size: instance.getKittenSize() }));
};

run()
  .then(() => {
    console.log("Finished");
  })
  .catch((err) => {
    console.log(err);
  });
