import { FolderOpenDot } from "lucide-react";
import Link from "next/link";

export const ProjectsLink = () => {
  return (
    <Link
      href="/projects"
      className="bg-card rounded-lg p-4 shadow-md w-64 flex flex-row gap-3"
    >
      <FolderOpenDot size={25} />
      <h3 className="text-xl font-semibold text-foreground">See My Projects</h3>
    </Link>
  );
};
