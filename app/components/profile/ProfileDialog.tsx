"use client";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ProgrammerDetails from "./programmerDetails";
import { DialogContent } from "@/components/ui/dialog";
import { NotebookText } from "lucide-react";
var sound = new Howl({
  src: ["/sounds/buttonSounds/typing-sound-02-229861.mp3"],
  rate: 1,
});
export const ProfileDialog = () => {
  let timeout: NodeJS.Timeout | null = null;
  const mouseEnterHandler = () => {
    timeout = setTimeout(() => {
      sound.play();
    }, 254);
  };
  const mouseOutHandler = () => {
    clearTimeout(timeout!);
    sound.stop();
  };
  return (
    <Dialog>
      <DialogTrigger
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseOutHandler}
      >
        <Card className="bg-card rounded-lg p-4 w-64 border-0 justify-start text-left drop-shadow-3xl flex flex-row items-center gap-3 hover:drop-shadow-none delay-100 transition hover:translate-x-4">
          <NotebookText size={25} /* className="mt-4 mb-4" */ />
          <h3 className="text-xl font-semibold text-foreground">My profile</h3>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ProgrammerDetails />
      </DialogContent>
    </Dialog>
  );
};
