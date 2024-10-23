"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MapPin, Calendar, Star, GitFork } from "lucide-react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
  useState,
  FormEvent,
} from "react";
import {
  GithubUsernameForm,
  useGithubAdversaryStatus,
} from "../components/GithubAdversary";
import { HeatMap } from "../components/HeatMap";
import { formatDistanceToNow } from "date-fns";
import { ContributionsAndViewerData } from "../lib/interface";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderOverlay } from "../components/LoaderOverlay";

interface GithubStatusProps extends ContributionsAndViewerData {}
export const AdversaryGitHubStatus = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const [showDialog, setShowDialog] = useState<boolean>(false);
  const { data, isLoading, error } = useGithubAdversaryStatus(username);
  const hasError = error && !isLoading;
  console.log("AdversaryGitHubStatus data", data);

  const cancelQuery = () => {
    queryClient.cancelQueries({ queryKey: ["contributions", username] });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 md:w-1/2">
      <LoaderOverlay isLoading={isLoading} />
      <Dialog open={openDialog}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpenDialog(true)} variant="outline">
            {data ? "Another Profile?" : "Compare Githubs?"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <GithubUsernameForm
              username={username}
              setOpenDialog={setOpenDialog}
              hasError={!!hasError}
              setUsername={setUsername}
            />
          </div>
        </DialogContent>
      </Dialog>

      <AdversaryStatus
        contributionData={data?.contributionData}
        viewerData={data?.viewerData}
      />
    </div>
  );
};

const AdversaryStatus = ({
  contributionData,
  viewerData,
}: GithubStatusProps) => {
  if (!contributionData || !viewerData) return;
  const joinedDate = new Date(viewerData.createdAt);
  const formattedJoinDate = formatDistanceToNow(joinedDate, {
    addSuffix: true,
  });
  return (
    <>
      <Card className="w-full">
        <CardContent className="pt-2">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={viewerData.avatarUrl} alt={viewerData.name} />
              <AvatarFallback>{viewerData?.name?.slice(0, 2)}</AvatarFallback>
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
                  <CardContent className="pt-2">
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
    </>
  );
};
