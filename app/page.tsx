import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleProjectCard } from "./lib/interface";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // revalidate cache every hour

const fetchProjects = async() =>{
  const query = `*[_type=='project'] | order(_createdAt desc){
    name, smallDescription, 
      "currentSlug":slug.current,
      titleImage
  }`

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleProjectCard[] = await fetchProjects();
  console.log('data ', data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
      {data.map((post, idx)=>{
        return <Card key={idx}>
          <Image className="rounded-t-lg h-[200px] object-contain" height={500} width={500} alt="" src={urlFor(post.siteImage).url()}/>
          <CardContent className="mt-5">
            <h3 className="text-lg">{post.name}</h3>
            <p className="line-clamp-1 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.techDescription}</p>
            <Button asChild className="w-full m-7">
              <Link href={`/project/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      })}
    </div>
  );
}
