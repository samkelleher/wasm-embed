import * as embed from "./embed";

export const zip = embed.zip;

export function getSize(): i32 {
  return embed.zip.length;
}

export function getZip(): u8[] {
  return embed.zip;
}
