import { BoxStatus } from "./types";
import styles from "./box.module.scss";
import classNames from "classnames/bind";

interface BoxProps {
  value: string;
  status: BoxStatus;
}

const classes = classNames.bind(styles);

export default function Box({ value = "", status }: BoxProps) {
  const boxStatus = classes({
    correct: status === "correct",
    present: status === "present",
    absent: status === "absent",
    empty: status === "empty",
    edit: status === "edit",
  });

  return <div className={boxStatus}>{value}</div>;
}
