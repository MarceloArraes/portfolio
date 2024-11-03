import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ProgrammerDetails from "./programmerDetails";
import { DialogContent } from "@/components/ui/dialog";

export const ProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="bg-card rounded-lg p-4 shadow-md w-64 border-0 justify-start text-left">
          <h3 className="text-xl font-semibold text-foreground">My profile</h3>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ProgrammerDetails />
      </DialogContent>
    </Dialog>
  );
};
