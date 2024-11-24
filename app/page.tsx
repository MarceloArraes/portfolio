import Image from "next/image";
import Footer from "./components/Footer";
import { Typewriter } from "./components/Typewritter";
import { ContactDialog } from "./components/ContactMe";
import { ProfileDialog } from "./components/profile/ProfileDialog";
import { DownloadResume } from "./components/profile/ResumeDownload";
import { ProjectsLink } from "./components/projects/ProjectsLink";
import { GithubStatisticsLink } from "./components/github/GithubStatisticsLink";
import { AudioComponent } from "./components/profile/AudioComponent";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-4 ">
      <div className="flex flex-col items-center text-center select-none">
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
          <AudioComponent>
            <ProjectsLink />
          </AudioComponent>

          <AudioComponent>
            <ProfileDialog />
          </AudioComponent>

          <AudioComponent>
            <DownloadResume />
          </AudioComponent>

          <AudioComponent>
            <ContactDialog />
          </AudioComponent>
          <AudioComponent>
            <GithubStatisticsLink />
          </AudioComponent>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

{
  /* <MessageBoardUseQuery /> */
}
{
  /* <CreateMessage /> */
}
{
  /* <Dialog>
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
          </Dialog> */
}
