/**
 * hooks/useCustomCursor.js
 * Zarządza stanem i pozycją niestandardowego kursora.
 * Obsługuje interakcje (hover) z linkami i przyciskami.
 */

import { useState, useEffect } from "react";

export function useCustomCursor() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const handleMove = (event) => {
      setCursorVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleLeaveDocument = (event) => {
      if (!event.relatedTarget && !event.toElement) {
        setCursorVisible(false);
        setCursorExpanded(false);
      }
    };

    const handlePointerOver = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("a, button, [data-cursor='hover']")
          : null;
      if (target) setCursorExpanded(true);
    };

    const handlePointerOut = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("a, button, [data-cursor='hover']")
          : null;
      if (target) setCursorExpanded(false);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleLeaveDocument);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeaveDocument);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return { cursorVisible, cursorExpanded, cursorPosition };
}
