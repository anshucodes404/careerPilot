import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 20) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) clearInterval(interval);
    }, speed); // speed = delay between characters

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}
