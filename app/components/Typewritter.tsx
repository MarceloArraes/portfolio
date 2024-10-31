"use client";
import React, { useState, useEffect, useCallback } from "react";
import { kodeMono } from "../../styles/fonts";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  const typeNextChar = useCallback(() => {
    setDisplayedText((prev) => {
      if (prev.length < text.length) {
        const nextChar = text[prev.length];

        return prev + nextChar;
      }
      return prev;
    });
  }, [text]);

  useEffect(() => {
    setDisplayedText("");

    const intervalId = setInterval(() => {
      typeNextChar();
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed, typeNextChar]);

  return (
    <h1 className={`text-4xl font-bold text-primary ${kodeMono.className}`}>
      {displayedText}
    </h1>
  );
};
