import { Profile } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = `*[_type == "profile"]{
      "resumeURL": resume.asset->url
    }`;

    const data: Profile[] = await client.fetch(query);
    const resumeURL = data?.[0]?.resumeURL;

    if (!resumeURL) {
      return new Response(JSON.stringify({ message: "Resume URL not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(resumeURL);
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": 'attachment; filename="Marcelo_resume.pdf"',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error downloading the resume" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
