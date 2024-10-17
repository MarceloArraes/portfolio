import { Calendar, GitFork, MapPin, Star } from "lucide-react";
import { HeatMap } from "../components/HeatMap";
// import { GithubContributions, WeekContribution } from "../lib/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

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
  console.log("json user", json.data.user);
  console.log("json viewer", json.data.viewer);
  return {
    contributionData:
      json.data.user.contributionsCollection.contributionCalendar,
    viewerData: json.data.viewer,
  };
};

const GitHubStatusPage = async () => {
  const { contributionData, viewerData } = await fetchContributionData();
  const joinedDate = new Date(viewerData.createdAt);
  const formattedJoinDate = formatDistanceToNow(joinedDate, {
    addSuffix: true,
  });

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      {/* Profile Header */}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={viewerData.avatarUrl} alt={viewerData.name} />
              <AvatarFallback>{viewerData.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{viewerData.name}</h1>
              <p className="text-muted-foreground mt-1">{viewerData.bio}</p>

              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{viewerData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formattedJoinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contributions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-card rounded-lg">
            <HeatMap
              data={contributionData.weeks}
              total={contributionData.totalContributions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pinned Repositories */}
      <Card>
        <CardHeader>
          <CardTitle>Pinned Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {viewerData.pinnedItems.nodes.map(
              (repo: {
                id: Key | null | undefined;
                url: string | undefined;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                primaryLanguage: {
                  color: any;
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                };
                stargazerCount:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                forkCount:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
              }) => (
                <Card key={repo.id} className="bg-card">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">
                      <a
                        href={repo.url}
                        className="hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4">
                      {repo.primaryLanguage && (
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: repo.primaryLanguage.color,
                            }}
                          />
                          <span className="text-sm">
                            {repo.primaryLanguage.name}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{repo.stargazerCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GitFork className="w-4 h-4" />
                        <span className="text-sm">{repo.forkCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubStatusPage;
