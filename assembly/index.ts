// The entry file of your WebAssembly module.
import * as embed from "./embed";

export const zip = embed.zip;

export function getSize(): i32 {
  return embed.zip.length;
}
