import { GitGraph } from "lucide-react";
import Link from "next/link";

export const GithubStatisticsLink = () => {
  return (
    <Link
      href="/githubStatus"
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <GitGraph size={25} />
      <h3 className="text-xl font-semibold text-foreground">Github Stats</h3>
    </Link>
  );
};
