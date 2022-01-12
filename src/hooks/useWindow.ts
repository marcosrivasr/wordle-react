import { useEffect } from "react";

export function useWindow(
  eventName: keyof WindowEventMap,
  callback: (event: WindowEventMap[keyof WindowEventMap]) => void
) {
  useEffect(() => {
    window.addEventListener(eventName, callback, false);

    return function () {
      window.removeEventListener(eventName, callback, false);
    };
  });
}
