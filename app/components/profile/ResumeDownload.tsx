"use client";
// import { client } from "../../lib/sanity";

import Link from "next/link";
import { File } from "lucide-react";
import { URL } from "url";
import { fetchResume } from "./fetchResume";
// import { Profile } from "@/app/lib/interface";
var sound = new Howl({
  src: ["/sounds/buttonSounds/typing-sound-01-229863.mp3"],
  rate: 1,
});

export async function DownloadResume() {
  const resumeURL = fetchResume();
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
  // console.log("resume resume", resumeURL);
  if (!resumeURL) {
    return <p>No resume found.</p>;
  }
  // const url = new URL(resumeURL as string);
  return (
    <Link
      href={resumeURL as unknown as URL}
      // target="_blank"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseOutHandler}
      download
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <File size={25} />
      <h3 className="text-xl font-semibold text-foreground">My Resume</h3>
    </Link>
  );
}
