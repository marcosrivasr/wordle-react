import styles from "./wordle.module.scss";
import { useEffect, useState } from "react";
import EmptyRow from "./emptyRow";
import CompletedRow from "./completedRow";
import { getWordOfTheDay, isValidWord } from "../service/request";
import CurrentRow from "./currentRow";
import { useWindow } from "../hooks/useWindow";
import { GameStatus } from "./types";
import Keyboard from "./keyboard";
import Modal from "./modal";

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
      return;
    }

    if (event.key === "Enter") {
      onEnter();
      return;
    }

    if (currentWord.length >= 5) return;

    if (keys.includes(letter)) {
      onInput(letter);
      return;
    }
  }

  function onEnter() {
    //if letter is not length 5, return
    if (currentWord.length < 5) {
      return;
    }
    //if letter is the word of the day you win
    if (currentWord === wordOfTheDay) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Won);
      return;
    }
    //if the turn is 6 and no word is found you lose
    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Lost);
      return;
    }

    if (currentWord.length === 5 && !isValidWord(currentWord)) {
      alert("Not a valid word");
      return;
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
    if (currentWord.length >= 5) {
      return;
    }
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  return (
    <>
      {gameStatus === GameStatus.Won ? (
        <Modal
          type="won"
          completedWords={completedWords}
          solution={wordOfTheDay}
        />
      ) : gameStatus === GameStatus.Lost ? (
        <Modal
          type="lost"
          completedWords={completedWords}
          solution={wordOfTheDay}
        />
      ) : null}
      <div className={styles.mainContainer}>
        {completedWords.map((word, i) => (
          <CompletedRow key={i} word={word} solution={wordOfTheDay} />
        ))}
        {gameStatus === GameStatus.Won ? null : (
          <CurrentRow word={currentWord} />
        )}

        {Array.from(Array(6 - turn)).map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </div>
      <Keyboard
        keys={keys}
        onInput={onInput}
        onDelete={onDelete}
        onEnter={onEnter}
      />
    </>
  );
}
