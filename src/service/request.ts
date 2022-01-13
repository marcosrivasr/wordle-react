import { WORDS } from "./words";

function getWords() {
  return WORDS;
}

export function getWordOfTheDay() {
  debugger;
  const words = getWords();
  const wordOfTheDay = words[getDayOfTheYear()];
  return wordOfTheDay.toUpperCase();
}

export function isValidWord(word: string) {
  const words = getWords();
  return words.includes(word.toLowerCase());
}

function getDayOfTheYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    <any>now -
    <any>start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}
