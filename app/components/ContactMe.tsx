"use client";
import React, { useState } from "react";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";

export const ContactDialog = () => {
  const [open, setOpen] = useState(false);
  const Web3Key = process.env.NEXT_PUBLIC_WEB3_EMAIL_ACCESS_KEY ?? "";
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
      <DialogTrigger asChild>
        <Button variant="outline">Contact Me</Button>
      </DialogTrigger>

      {/* <Dialog.Overlay className="fixed inset-0 bg-black/50" /> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>
            Feel free to leave your message and I&apos;ll get back to you.
          </DialogDescription>
        </DialogHeader>
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
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
