import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ProgrammerDetails from "./programmerDetails";
import { DialogContent } from "@/components/ui/dialog";
import { NotebookText } from "lucide-react";

export const ProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Card className="bg-card rounded-lg p-4 w-64 border-0 justify-start text-left drop-shadow-3xl flex flex-row items-center gap-3 hover:drop-shadow-none delay-100 transition hover:translate-x-4">
          <NotebookText size={25} />

          <h3 className="text-xl font-semibold text-foreground">My profile</h3>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ProgrammerDetails />
      </DialogContent>
    </Dialog>
  );
};
