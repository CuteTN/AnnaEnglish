/**
 * @param {string} englishWordType 
 * @returns 
 */
export const toVietnameseWordTypes = (englishWordType) => {
  const typeMap = {
    "interj": "Thán từ",
    "n": "Danh từ",
    "v": "Động từ",
    "adj": "Tính từ",
    "adv": "Trạng từ",
  }

  return typeMap[englishWordType] ?? "";
}