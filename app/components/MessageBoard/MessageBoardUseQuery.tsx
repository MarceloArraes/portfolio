"use client";
import { Message } from "@/app/lib/interface";
// import { getMessages } from "@/app/lib/sanity";
import { useQuery } from "@tanstack/react-query";

export const MessageBoardUseQuery = ({
  initialData,
}: {
  initialData?: { messages: Message[] };
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await fetch("/api/messages");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    },
    staleTime: 0,
    // initialData, // Use server-provided initial data
  });
  // console.log("client side error?", error);
  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Message Board</h1>

      <ul>
        {data.messages.map((message: Message) => (
          <li key={message._id}>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
