import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import Footer from "./components/Footer";
// import { msSansRetro, kodeMono } from "../styles/fonts";
import { Typewriter } from "./components/Typewritter";
// import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
import ProgrammerDetails from "./components/profile/programmerDetails";
import { Card } from "@/components/ui/card";
import { ContactDialog } from "./components/ContactMe";
import Link from "next/link";
import { MessageBoard } from "./components/MessageBoard/MessageBoard";
import { CreateMessage } from "./components/MessageBoard/CreateMessage";
import { MessageBoardUseQuery } from "./components/MessageBoard/MessageBoardUseQuery";
import { ProfileDialog } from "./components/profile/ProfileDialog";
// import { ThreeDComponent } from "./components/ThreeDComponent";
// import { ThreeCanvas } from "./components/ThreeCanvas";
// import { ThreePhone } from "./components/ThreePhone";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/myPics/marceloSythLord2-removebg-preview.png"
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full mb-6"
        />
        {/* <h1 className={`text-4xl font-bold text-primary ${kodeMono.className}`}>
          Hey, I&apos;m Marcelo
        </h1> */}

        {/* <div className="fixed top-0 left-0">
          <ThreeCanvas>
            <ThreeDComponent />
          </ThreeCanvas>
        </div> */}
        <Typewriter text="Hey, I'm Marcelo" speed={200} />
        <p className="mt-4 text-muted text-2xl">Full stack developer</p>
        <p className="mt-2 text-muted text-xl">
          Moved by a incessant curiosity and desire to build something{" "}
          <span className="text-primary font-semibold animate-pulse delay-1000">
            Great
          </span>
          .
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-primary text-center"></h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {/* <MessageBoardUseQuery /> */}
          {/* <CreateMessage /> */}
          <Link
            href="/projects"
            className="bg-card rounded-lg p-4 shadow-md w-64"
          >
            <h3 className="text-xl font-semibold text-foreground">
              See My Projects
            </h3>
          </Link>
          {/* <ProfileDialog /> */}
          {/* <Dialog>
            <DialogTrigger>
              <Card className="bg-card rounded-lg p-4 shadow-md w-64 border-0 justify-start text-left">
                <h3 className="text-xl font-semibold text-foreground">
                  Anonymous Message
                </h3>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <CreateMessage />
            </DialogContent>
          </Dialog> */}
          <ContactDialog />

          {/* </Card> */}
          <Link
            href="/githubStatus"
            className="bg-card rounded-lg p-4 shadow-md w-64"
          >
            <h3 className="text-xl font-semibold text-foreground">
              See Github Statistics
            </h3>
            {/* <p className="text-muted mt-2">2 years experience</p> */}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
