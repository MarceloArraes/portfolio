"use client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { FormEvent, FormEventHandler, SyntheticEvent, useState } from "react";

const fetchContributionData = async (username: string) => {
  const query = `
    {
      user(login: "${username}") {
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
      viewer {
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
      }
    }`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  return {
    contributionData:
      json.data.user.contributionsCollection.contributionCalendar,
    viewerData: json.data.viewer,
  };
};

const GithubAdversary = () => {
  const [username, setUsername] = useState("");
  const onSubmitGithubUsername = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("username") as HTMLInputElement;

    console.log("input value", input.value);
    setUsername(input.value);
  };

  const { data, isLoading, error } = useQuery({
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("data3, ", data);

  // const { contributionData, viewerData } = data;
  const contributionData = data?.contributionData;
  const viewerData = data?.viewerData;
  const joinedDate = new Date(viewerData?.createdAt ?? null);
  const formattedJoinDate = formatDistanceToNow(joinedDate, {
    addSuffix: true,
  });

  return (
    <div>
      <form onSubmit={onSubmitGithubUsername}>
        {data && (
          <>
            <h1>GitHub Status Page for {username}</h1>
            <p>Joined GitHub {formattedJoinDate}</p>
            <p>Total Contributions: {contributionData.totalContributions}</p>
            <br />
          </>
        )}

        <input
          type="text"
          name="username"
          defaultValue={username ?? ""}
          // onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
      </form>
    </div>
  );
};

export default GithubAdversary;
