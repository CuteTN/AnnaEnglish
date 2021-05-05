/**
 * @param {string} username 
 * @returns {boolean}
 */
export const validateUsername = (username) => {
  let patt = new RegExp("[a-zA-Z0-9._]");
  return patt.test(username);
}

/**
 * @param {string} username 
 * @returns {string}
 */
export const createFakeEmail = (username) => {
  return username.toLowerCase() + "@annaenglish.cute"
}