import Link from "next/link";
import { ThemeToggle } from "./themeToggle";

export default function Navbar() {
    return (
        <nav className="flex-row w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
            <Link href={'/'} className="font-bold text-3xl ">
              Marcelo<span className="text-primary">Portfolio</span>
            </Link>
            <ThemeToggle />
        </nav>
    )
}