import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import { simpleProjectCard } from "../lib/interface";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // revalidate cache every hour

const fetchProjects = async () => {
  const query = `*[_type=='project'] | order(_createdAt desc){
    name, description, 
      "currentSlug":slug.current,
      siteImage
  }`;

  const data = await client.fetch(query);
  return data;
};

export default async function Projects() {
  const data: simpleProjectCard[] = await fetchProjects();
  console.log("data ", data);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Create Goal 🎯
            </Button>
          </DialogTrigger>
          <ProgrammerDetails />
        </Dialog> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post, idx) => {
          return (
            <Card
              key={idx}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden items-center"
            >
              <Image
                className="rounded-t-lg h-[200px] w-full object-cover"
                height={500}
                width={500}
                alt=""
                src={urlFor(post?.siteImage)?.url() ?? ""}
              />
              <CardContent className="flex mt-5 items-center justify-center flex-col">
                <h3 className="text-lg">{post.name}</h3>
                <p className="line-clamp-1 text-sm mt-2 text-gray-600 dark:text-gray-300">
                  {post.techDescription}
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link href={`/project/${post.currentSlug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
