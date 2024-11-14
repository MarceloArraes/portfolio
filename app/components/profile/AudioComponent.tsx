"use client";
import { ReactNode } from "react";
import { Howl } from "howler";
var sound = new Howl({
  src: ["/sounds/buttonSounds/typing-sound-02-229861.mp3"],
  rate: 1,
});
export const AudioComponent = ({ children }: { children: ReactNode }) => {
  let timeout: NodeJS.Timeout | null = null;
  const mouseEnterHandler = () => {
    timeout = setTimeout(() => {
      sound.play();
    }, 247);
  };
  const mouseOutHandler = () => {
    clearTimeout(timeout!);
    // sound.stop();
  };
  return (
    <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseOutHandler}>
      {children}
    </div>
  );
};
