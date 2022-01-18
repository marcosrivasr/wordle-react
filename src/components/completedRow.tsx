import Box from "./Box";
import styles from "./row.module.scss";
import { BoxStatus } from "./types";

interface CompletedRowProps {
  word: string;
  solution: string;
  animate: boolean;
}

export default function CompletedRow({
  word,
  solution,
  animate = false,
}: CompletedRowProps) {
  const arr = Array.from(Array(5));

  function checkLetter(letter: string, pos: number): BoxStatus {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) {
        return "correct";
      } else {
        return "present";
      }
    } else {
      return "absent";
    }
  }

  return (
    <div className={styles.row}>
      {arr.map((_, i) => (
        <Box
          key={i}
          value={word[i]}
          status={checkLetter(word[i], i)}
          animate={animate}
          pos={i}
        />
      ))}
    </div>
  );
}
