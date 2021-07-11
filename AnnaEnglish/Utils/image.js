export const extractImageUri = (text, vocabulary) => {
  if (!text)
    return null;

  if (text.startsWith("vocabulary."))
    return vocabulary ? vocabulary[text.replace("vocabulary.", "")]?.image : null;

  return text;
}