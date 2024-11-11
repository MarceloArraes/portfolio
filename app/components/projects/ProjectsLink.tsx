"use client";
import { FolderOpenDot } from "lucide-react";
import Link from "next/link";
import { Howl } from "howler";
var sound = new Howl({
  src: ["/sounds/buttonSounds/typing-sound-01-229863.mp3"],
  rate: 1,
});
export const ProjectsLink = () => {
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
      href="/projects"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseOutHandler}
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <FolderOpenDot size={25} />
      <h3 className="text-xl font-semibold text-foreground">See My Projects</h3>
    </Link>
  );
};
