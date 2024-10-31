"use client";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const createMessageMutationFn = async (messageText: string) => {
  const response = await fetch("/api/createMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        _type: "messages",
        active: true,
        message: messageText,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create message");
  }
  return await response.json();
};

export const CreateMessage = () => {
  const queryClient = useQueryClient();
  const [messageText, setMessageText] = useState("");

  const mutation = useMutation({
    mutationFn: createMessageMutationFn,
    onSuccess: () => {
      console.log("Message created successfully");
      toast.success("Message created successfully");
      // Invalidate messages query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setMessageText(""); // Reset input
    },
    onError: (error) => {
      console.error("Error creating message:", error);
      toast.error("An error occurred while creating the message");
    },
  });

  const handleCreateMessage = () => {
    mutation.mutate(messageText);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vandalize My Page</h1>
      <h2>Leave a short message</h2>
      <Input
        value={messageText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessageText(e.target.value)
        }
      />
      <button
        onClick={handleCreateMessage}
        disabled={mutation.isPending}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {mutation.isPending ? "Creating..." : "Add New Message"}
      </button>
    </div>
  );
};
