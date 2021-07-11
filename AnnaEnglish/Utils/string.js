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