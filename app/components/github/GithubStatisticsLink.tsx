"use client";
import { GitGraph } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Howl, Howler } from "howler";

var sound = new Howl({
  src: ["/sounds/buttonSounds/typing-sound-01-229863.mp3"],
  rate: 1,
});
// var sound = new Howl({
//   src: ["/sounds/buttonSounds/typing-sound-02-229861.mp3"],
//   rate: 1,
// });

export const GithubStatisticsLink = () => {
  // const soundRef = useRef<Howl | null>(null);
  let timeout: NodeJS.Timeout | null = null;
  const mouseEnterHandler = () => {
    timeout = setTimeout(() => {
      sound.play();
    }, 247);
  };
  const mouseOutHandler = () => {
    clearTimeout(timeout!);
    sound.stop();
  };

  return (
    <Link
      href="/githubStatus"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseOutHandler}
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <GitGraph size={25} />
      <h3 className="text-xl font-semibold text-foreground">Github Stats</h3>
    </Link>
  );
};
