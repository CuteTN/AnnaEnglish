import { speak, Voice, getAvailableVoicesAsync, SpeechOptions } from "expo-speech"
import { randomInt } from "./math";

const savedVoices = {};

/**
 * @param {"vi"|"en"} lang
 * @returns {Promise<[Voice]>}
 */
const getVoices = async (lang) => {
  if (savedVoices[lang]?.length)
    return savedVoices[lang];

  const allVoices = await getAvailableVoicesAsync();

  const result = allVoices
    ?.filter(voice => {
      return voice?.language.startsWith(lang.toLowerCase())
    });

  savedVoices[lang] = result;
  return result;
}

/**
 * @param {"vi"|"en"} lang
 * @returns {Promise<Voice>}
 */
const pickRandomVoice = async (lang) => {
  const voices = await getVoices(lang);
  const ind = randomInt(0, voices.length - 1);
  return voices[ind];
}

/**
 * @param {"vi"|"en"} lang
 * @param {*} text
 * @param {SpeechOptions} options 
 */
export const speakWithRandomVoice = async (lang, text, options) => {
  const voice = await pickRandomVoice(lang);

  try {
    speak(text, {
      ...options,
      language: lang,
      voice: voice?.identifier,
    })
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {*} text
 * @param {SpeechOptions} options 
 */
export const speakEnglish = async (text, options) => {
  await speakWithRandomVoice("en", text, options)
}

/**
 * @param {*} text
 * @param {SpeechOptions} options 
 */
export const speakVietnamese = async (text, options) => {
  await speakWithRandomVoice("vi", text, options)
}