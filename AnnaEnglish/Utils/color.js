/**
 * @param {String} hex 
 * @returns 
 */
export const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export const isBrightColor = hexColor => {
  const { r, g, b } = hexToRgb(hexColor);
  return r + g + b > 255 * 3 / 2
}