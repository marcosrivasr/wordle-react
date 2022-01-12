import Box from "./Box";
import styles from "./row.module.scss";

interface CurrentRowProps {
  word: string;
}

export default function CurrentRow({ word }: CurrentRowProps) {
  const wordArray = word.split("");

  return (
    <div className={styles.row}>
      {wordArray.map((letter, i) => (
        <Box key={i} value={letter} status="edit" />
      ))}
      {Array.from(Array(5 - wordArray.length)).map((letter, i) => (
        <Box key={i} value={""} status="edit" />
      ))}
    </div>
  );
}
