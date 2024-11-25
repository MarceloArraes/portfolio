import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";

import Navbar from "./components/Navbar";
// import { msSansRetro } from "../styles/fonts";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
// import { ClothSimulation } from "./components/IterativeBackgrounds/TearableCloth";
import { EnhancedClothWrapper } from "./components/EnhancedClothWrapper";
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
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster />
            {/* <ClothSimulation /> */}
            <EnhancedClothWrapper />
            <main className="z-10">{children}</main>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
