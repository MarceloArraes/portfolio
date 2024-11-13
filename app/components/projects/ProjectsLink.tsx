import { FolderOpenDot } from "lucide-react";
import Link from "next/link";
import { Howl } from "howler";

export const ProjectsLink = () => {
  return (
    <Link
      href="/projects"
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <FolderOpenDot size={25} />
      <h3 className="text-xl font-semibold text-foreground">See My Projects</h3>
    </Link>
  );
};
