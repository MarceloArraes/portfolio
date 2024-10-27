"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { FormEvent } from "react";

const fetchContributionData = async (username: string) => {
  const query = `
    {
      user(login: "${username}") {
        url
        name
        avatarUrl
        bio
        createdAt
        location
        status {
          id
        }
        pinnedItems(first: 6) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
      
    }`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  // const json = await response.json();
  return {
    contributionData:
      response.data.user.contributionsCollection.contributionCalendar,
    viewerData: response.data.user,
  };
};

export const useGithubAdversaryStatus = (username: string) => {
  return useQuery({
    queryKey: ["contributions", username],
    queryFn: async () => {
      // const variables = {
      //   login: username,
      //   after: null, // You can dynamically update this if needed
      //   includeMergedPullRequests: true, // Set based on your conditions
      //   includeDiscussions: false, // Set based on your conditions
      //   includeDiscussionsAnswers: false, // Set based on your conditions
      // };

      const response = await fetchContributionData(username);
      // console.log("response", response);
      // const data = await response.json(); // Make sure to parse the response JSON
      // console.log("data", data);
      return response;
    },
    enabled: !!username,
  });
};

interface GithubUsernameFormProps {
  username: string;
  setUsername: (username: string) => void;
  hasError: boolean;
  setOpenDialog: (openDialog: boolean) => void;
}

export const GithubUsernameForm = ({
  username,
  setUsername,
  hasError,
  setOpenDialog,
}: GithubUsernameFormProps) => {
  const onSubmitGithubUsername = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("username") as HTMLInputElement;

    console.log("input value", input.value);
    setUsername(input.value);
    setOpenDialog(false);
  };

  return (
    <form onSubmit={onSubmitGithubUsername}>
      <div className="grid grid-cols-4 items-center gap-4 mb-2">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          name="username"
          defaultValue={username ?? ""}
          className={`col-span-3 border rounded ${hasError ? "outline-red-600 border-red-600" : "border-gray-300"}`}
          placeholder="Enter GitHub username"
        />
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
      {hasError && <span>Could not find {username}</span>}
    </form>
  );
};
