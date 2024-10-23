import { GithubStatus } from "./GithubStatus";
import { ContributionsAndViewerData } from "../lib/interface";

const fetchContributionData = async () => {
  const query = `
    {
      user(login: "marceloarraes") {
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
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  //   console.log("json user", json.data.user);
  //   console.log("json viewer", json.data.viewer);
  return {
    contributionData:
      json.data.user.contributionsCollection.contributionCalendar,
    viewerData: json.data.viewer,
  } as ContributionsAndViewerData;
};

const GitHubStatusPage = async () => {
  const { contributionData, viewerData } = await fetchContributionData();
  console.log("viewerData", viewerData);
  return (
    <div className="container mx-auto p-4 space-y-6 max-w-full">
      <GithubStatus
        contributionData={contributionData}
        viewerData={viewerData}
      />
    </div>
  );
};

export default GitHubStatusPage;
