// The entry file of your WebAssembly module.
import * as embed from "./embed";

export function getSize(): i32 {
  const test = embed.zip.length;
  return test;
}
