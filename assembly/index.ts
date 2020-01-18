import * as embed from "./embed";

export const zip = embed.zip;

export function getZipSize(): i32 {
  return embed.zip.length;
}

export function getZip(): u8[] {
  return embed.zip;
}

export const kitten = embed.kitten;

export function getKittenSize(): i32 {
  return embed.kitten.length;
}

export function getKitten(): u8[] {
  return embed.kitten;
}

export const text = embed.text;

export function getTextSize(): i32 {
  return embed.text.length;
}

export function getText(): u8[] {
  return embed.text;
}
