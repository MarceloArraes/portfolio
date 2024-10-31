import { simpleProjectCard } from "@/app/lib/interface";
import { client, getVideoUrl, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Video } from "@/components/ui/video"; // Assuming you have a custom video component or ShadCN-compatible component for video display
import Link from "next/link";

export const revalidate = 30;

async function getDataOfProject(slug: string) {
  const querySingleProject = `*[_type=="project" && slug.current == '${slug}'] {
        name,
        description,
        siteImage,
        siteLink,
        tags,
        showcaseVideoFile,
        techDescription,
        "currentSlug": slug.current
    }`;
  const data = await client.fetch(querySingleProject);
  return data;
}

const ProjectArticle = async ({ params }: { params: { slug: string } }) => {
  const data: simpleProjectCard[] = await getDataOfProject(params.slug);
  //   type ProjectData = ReturnType<typeof getDataOfProject>;
  console.log("data1223", data);
  return (
    <div className="container mx-auto mt-12 p-4">
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        {data[0]?.name}
      </h1>

      {data[0]?.currentSlug && (
        <p className="text-center mt-2 text-lg text-muted-foreground">
          {data[0]?.currentSlug}
        </p>
      )}

      <Separator className="my-6" />

      <div className="flex justify-center">
        {data[0]?.siteImage && (
          <Image
            priority
            className="rounded-lg border shadow-lg"
            height={800}
            width={800}
            alt={`${data[0]?.name} project image`}
            src={urlFor(data[0]?.siteImage)?.url() ?? ""}
          />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Description</h2>
        <div className="prose prose-lg dark:prose-invert mt-4">
          <PortableText value={data[0]?.description} />
        </div>
      </div>

      {data[0]?.techDescription && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Tech Description</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {data[0]?.techDescription}
          </p>
        </div>
      )}

      {data[0]?.tags?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Tags</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {data[0]?.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {data[0]?.showcaseVideoFile && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Showcase Video</h2>
          <div className="mt-4">
            <Video
              src={getVideoUrl(data[0]?.showcaseVideoFile) ?? ""}
              controls
            />
          </div>
        </div>
      )}

      {data[0]?.siteLink && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link
              href={data[0]?.siteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectArticle;
