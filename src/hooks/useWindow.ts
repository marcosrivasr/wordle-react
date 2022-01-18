import { useEffect } from "react";

export function useWindow(eventName: keyof WindowEventMap, callback: any) {
  useEffect(() => {
    window.addEventListener(eventName, callback);

    return () => {
      window.removeEventListener(eventName, callback);
    };
  });
}
