import { BoxStatus } from "./types";
import styles from "./box.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

interface BoxProps {
  value: string;
  status: BoxStatus;
  animate?: boolean;
  pos?: number;
}

const classes = classNames.bind(styles);

export default function Box({
  value = "",
  status,
  animate = false,
  pos,
}: BoxProps) {
  const boxStatus = classes({
    correct: status === "correct",
    present: status === "present",
    absent: status === "absent",
    empty: status === "empty",
    edit: status === "edit",
  });

  return <div className={boxStatus}>{value}</div>;
}
