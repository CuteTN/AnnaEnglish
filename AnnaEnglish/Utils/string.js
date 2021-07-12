/**
 * @param {string} src 
 * @param {string} replaceValue 
 * @returns {string}
 */
export const replaceBlank = (src, replaceValue) => {
  if (!src)
    src = "";
  if (!replaceValue)
    replaceValue = "";

  let result = src;

  result = result.replace("_", replaceValue);
  while (result.includes("_"))
    result = result.replace("_", "");

  return result;
}

/**
 * @param {string} src 
 * @param {[string]} replaceValues
 * @returns {string}
 */
export const replaceBlanks = (src, replaceValues) => {
  if (!src)
    src = "";
  if (!replaceValues)
    replaceValues = [];

  const MAGIC_GUARD = "$$";
  src = MAGIC_GUARD + src + MAGIC_GUARD;

  const splSrc = src.split("_").filter(s => s);

  if (splSrc?.length === 0)
    return "";

  let result = splSrc[0];
  for (let i = 1; i < Math.min(splSrc?.length, replaceValues?.length + 1); i++) {
    result += replaceValues[i - 1] + splSrc[i];
    console.log(result);
  }

  result = result.substr(MAGIC_GUARD.length, result.length - 2 * MAGIC_GUARD.length);
  console.log(result);
  return result;
}

/**
 * @param {string} word 
 * @returns {string}
 */
export const toSpelling = (word) => {
  if (!word)
    return "";

  word = word.trim();

  const result = " " + word.split("").join(", ") + ", " + word;
  return result;
}