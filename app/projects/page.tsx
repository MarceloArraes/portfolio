import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import { simpleProjectCard } from "../lib/interface";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const revalidate = 30; // revalidate cache every hour

const fetchProjects = async () => {
  const query = `*[_type=='project'] | order(_createdAt desc){
    name, description, 
      "currentSlug":slug.current,
      siteImage,
        tags,
      showcaseVideoFile,

  }`;

  const data = await client.fetch(query);
  return data;
};

export default async function Projects() {
  const data: simpleProjectCard[] = await fetchProjects();
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post, idx) => {
          return (
            <Link
              key={idx}
              href={`/project/${post.currentSlug}`}
              className="group"
            >
              <Card className="h-full rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-200 overflow-hidden items-center">
                <Image
                  className="rounded-t-lg h-[200px] w-full object-cover transition-transform group-hover:scale-105"
                  height={500}
                  width={500}
                  alt=""
                  src={urlFor(post?.siteImage)?.url() ?? ""}
                />
                <CardContent className="flex mt-5 flex-col">
                  <CardTitle className="group-hover:text-primary">
                    {post.name}
                  </CardTitle>
                  <p className="line-clamp-1 text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {post.techDescription}
                  </p>
                  {post?.tags?.length > 0 && (
                    <div className="mt-2">
                      <h2 className="text-lg font-bold">Tags</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post?.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="transition-transform group-hover:scale-105"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* <Button asChild variant="default" className="w-full">
                    <Link href={`/project/${post.currentSlug}`}>Read More</Link>
                  </Button> */}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
