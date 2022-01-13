import styles from "./keyboard.module.scss";
import classNames from "classnames/bind";

interface KeyboardProps {
  keys: string[];
  onInput: (letter: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

const classes = classNames.bind(styles);

export default function Keyboard({
  keys,
  onInput,
  onEnter,
  onDelete,
}: KeyboardProps) {
  function getStyle(letter: string, pos: number) {
    const keyStyles = classes(styles.key);

    return keyStyles;
  }

  function handleInput(e: any) {
    onInput(e.target.textContent);
  }

  function handleEnter(e: any) {
    onEnter();
  }
  function handleDelete(e: any) {
    onDelete();
  }

  return (
    <div className={styles.keyboardContainer}>
      {Array.from(Array(10)).map((_, i) => (
        <button key={i} className={getStyle(keys[i], i)} onClick={handleInput}>
          {keys[i]}
        </button>
      ))}
      <div className={styles.emptyKey}></div>
      {Array.from(Array(9)).map((_, i) => (
        <button
          key={i + 10}
          className={getStyle(keys[i], i)}
          onClick={handleInput}
        >
          {keys[i + 10]}
        </button>
      ))}
      <button className={styles.enterKey} onClick={handleEnter}>
        ENTER
      </button>
      {Array.from(Array(7)).map((_, i) => (
        <button
          key={i + 19}
          className={getStyle(keys[i], i)}
          onClick={handleInput}
        >
          {keys[i + 19]}
        </button>
      ))}
      <button className={styles.deleteKey} onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}
