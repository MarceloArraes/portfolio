// import Link from "next/link";
import { ThemeToggle } from "./themeToggle";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-1">
      {/* <nav className="flex-row w-full relative flex items-center justify-center max-w-2xl mx-auto px-4 py-5">
        <Link href={"/"} className="font-bold text-6xl ">
          Marcelo&apos;s<span className="text-primary">Portfolio</span>
        </Link>
      </nav> */}
      <Image
        src="/marceloLogo.svg"
        alt="Marcelogo"
        width={120}
        height={120}
        className="left-0 m-5 fixed top-0 rounded-full w-auto max-w-32"
      />
      <div className="fixed right-0 m-5">
        <ThemeToggle />
      </div>
    </div>
  );
}
