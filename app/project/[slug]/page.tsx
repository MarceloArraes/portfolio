import { simpleProjectCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getDataOfProject(slug:string){
    const querySingleProject = `*[_type=="project" && slug.current == '${slug}'] {
        name,
        content,
        titleImage,
          "currentSlug": slug.current,
        content
    }`
    const data = await client.fetch(querySingleProject);
    return data;
}


const ProjectArticle = async ({params}:{params: {slug:string}}) =>{
    const data: simpleProjectCard[] = await getDataOfProject(params.slug);
    console.log('data2131 ', data, params.slug);
    return(
    <div className="mt-8">
    <h1>
        <span className="block text-base  text-center text-primary font-semibold tracking-wide uppercase">
        {data[0].name}
            
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
        Hello from project and stuff412
            
            </span>
    </h1>
        {data[0].currentSlug}
        {data[0].smallDescription}

    <Image priority className="rounded mt-8 border" height={800} width={800} alt="" src={urlFor(data[0].titleImage).url()}/>
    <div className="mt-16 prose-purple prose-xl dark:prose-invert prose-li:text-primary prose-a:text-primary">
        <PortableText value={data[0].content}/>
    </div>
    </div>
    )
}

export default ProjectArticle;