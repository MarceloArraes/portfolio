import { Profile } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";

export const fetchResume = async () => {
  const query = `*[_type == "profile"]{
  "resumeURL": resume.asset->url
}`;

  try {
    const data: Profile[] = await client.fetch(query);
    console.log("resume", data);
    return data?.[0].resumeURL;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return [];
  }
};
