"use client";
import React, { useState } from "react";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogClose,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
// import { Howl, Howler } from "howler";
import { ThreeCanvas } from "./ThreeCanvas";
import { ThreePhone } from "./ThreePhone";
import { MessageBoard } from "./MessageBoard/MessageBoard";
import { CreateMessage } from "./MessageBoard/CreateMessage";
import { Phone } from "lucide-react";

// var sound = new Howl({
//   src: ["Doom-healerStalks.mp3"],
// });

// var sound = new Howl({
//   src: ["sound.webm", "sound.mp3"],
// });

export const ContactDialog = () => {
  const [open, setOpen] = useState(false);
  const [openMessageForm, setOpenMessageForm] = useState(false);
  const Web3Key = process.env.NEXT_PUBLIC_WEB3_EMAIL_ACCESS_KEY ?? "";

  // if (open == true) {
  //   sound.once("load", function () {
  //     console.log("load Doom-healerStalks.mp3 play");
  //     sound.play();
  //   });
  //   sound.on("end", function () {
  //     console.log("Finished!");
  //   });
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    formData.append("access_key", Web3Key);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setOpen(false); // Close the dialog after submission
      toast.success("Form Submitted Successfully");

      form.reset();
    } else {
      console.log("Error", data);
      toast.error("Error submitting message");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <Card className="bg-card rounded-lg p-4 shadow-md w-64 border-0 justify-start text-left flex flex-row gap-3">
          <Phone size={25} />
          <h3 className="text-xl font-semibold text-foreground">Contact Me</h3>
        </Card>
      </DialogTrigger>

      <DialogContent className="min-h-96 p-5">
        {!openMessageForm && (
          <DialogHeader>
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription>
              Leave any message and I&apos;ll get back to you.
            </DialogDescription>
          </DialogHeader>
        )}
        {openMessageForm && (
          <div className="w-full h-full">
            <CreateMessage />
          </div>
        )}
        <div className="absolute top-10 right-0 w-[300px] h-[300px]">
          <ThreeCanvas>
            <ThreePhone setOpenMessageForm={setOpenMessageForm} />
          </ThreeCanvas>
        </div>
        {!openMessageForm && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            //   action="https://api.web3forms.com/submit"
            //   method="POST"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Your message"
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
