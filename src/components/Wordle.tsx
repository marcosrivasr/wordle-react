import styles from "./wordle.module.scss";
import { createRef, useEffect, useState, KeyboardEvent } from "react";
import EmptyRow from "./emptyRow";
import CompletedRow from "./completedRow";
import { getWordOfTheDay, isValidWord } from "../service/request";
import CurrentRow from "./currentRow";
import { useWindow } from "../hooks/useWindow";
import { GameStatus } from "./types";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

export default function Wordle() {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const [turn, setTurn] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  useWindow("keydown", handleKeyDown);

  useEffect(() => {
    setWordOfTheDay(getWordOfTheDay());
  }, []);

  function handleKeyDown(event: any) {
    const letter = event.key.toUpperCase();

    if (event.key === "Backspace" && currentWord.length > 0) {
      onDelete();
    }

    if (event.key === "Enter") {
      onEnter();
    }

    if (currentWord.length >= 5) return;

    if (keys.includes(letter)) {
      onInput(letter);
    }
  }

  function onEnter() {
    if (currentWord === wordOfTheDay) {
      setGameStatus(GameStatus.Won);
    }

    setCompletedWords([...completedWords, currentWord]);
    setTurn(turn + 1);
    setCurrentWord("");
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  }

  function onInput(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  return (
    <div className={styles.mainContainer}>
      {gameStatus === GameStatus.Won ? <div>Ganaste!</div> : null}

      {completedWords.map((word, i) => (
        <CompletedRow key={i} word={word} solution={wordOfTheDay} />
      ))}
      <CurrentRow word={currentWord} />
      {Array.from(Array(6 - turn)).map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
}
