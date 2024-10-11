"use client";
import React, { useState, useEffect } from "react";
import { msSansRetro, kodeMono } from "../../styles/fonts";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, speed]);

  //   return <>{displayedText}</>;

  return (
    <h1 className={`text-4xl font-bold text-primary ${kodeMono.className}`}>
      {displayedText}
    </h1>
  );
};
