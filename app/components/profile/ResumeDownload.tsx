import { client } from "../../lib/sanity";

import Link from "next/link";
import { File } from "lucide-react";
import { URL } from "url";
import { Profile } from "@/app/lib/interface";

// const fetchResume = async () => {
//   const query = `*[_type == "profile"]{
//   "resumeURL": resume.asset->url
// }`;

//   try {
//     const data: Profile[] = await client.fetch(query);
//     console.log("resume", data);
//     return data?.[0].resumeURL;
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//     return "/";
//   }
// };

export async function DownloadResume() {
  // const resumeURL = await fetchResume();
  // console.log("resume resume", resumeURL);
  // if (!resumeURL) {
  //   return <p>No resume found.</p>;
  // }
  // const url = new URL(resumeURL as string);
  return (
    <a
      // src={resumeURL}
      // href={resumeURL}
      href="/api/downloadResume"
      // target="_blank"
      download="My_Resume.pdf"
      className="bg-card rounded-lg p-4 drop-shadow-3xl w-64 flex flex-row items-center justify-start gap-3 dark: shadow-slate-200 hover:drop-shadow-none delay-100 transition hover:translate-x-4"
    >
      <File size={25} />
      <h3 className="text-xl font-semibold text-foreground">My Resume</h3>
    </a>
  );
}
