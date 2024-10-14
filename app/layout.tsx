import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

import Navbar from "./components/Navbar";
// import { msSansRetro } from "../styles/fonts";
import { Toaster } from "sonner";
// const Kod = Kodchasan({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marcelo Portfolio",
  description: "My portfolio showcasing some projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body /* className={msSansRetro.className} */>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
