import getModule from "./getModule.mjs";

export default async function(path) {
  const compiled = getModule(path);

  const imports = {
    env: {
      abort(_msg, _file, line, column) {
        console.error(`abort called at index.ts:${line}:${column}`);
      },
    },
  };

  return new WebAssembly.Instance(compiled, imports).exports;
}
