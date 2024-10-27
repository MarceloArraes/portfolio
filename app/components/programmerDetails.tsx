import { X } from "lucide-react";
import { client, urlFor } from "../lib/sanity";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Profile } from "../lib/interface";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

const fetchProfile = async () => {
  const query = `*[_type=='profile']`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return [];
  }
};

async function ProgrammerDetails() {
  const data: Profile[] = await fetchProfile();
  // console.log("profile data", data);
  if (!data || data.length === 0) {
    return (
      <DialogContent>
        <p>No profiles found.</p>
      </DialogContent>
    );
  }
  return (
    <DialogContent>
      <div className="flex flex-col gap-6 min-h-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          {data.map((profile) => (
            <div key={profile._id} className="space-y-2">
              {profile.profileImage1 && (
                <div>
                  <Image
                    src={urlFor(profile?.profileImage1)?.url() ?? ""}
                    alt="Profile Image 1"
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <DialogTitle>{profile.name}</DialogTitle>

              <h2 className="text-lg font-bold"></h2>
              <div>
                <h3 className="font-semibold"></h3>

                <PortableText value={profile.description} />
              </div>
              <div>
                <DialogDescription>{profile.quote}</DialogDescription>
              </div>

              {/* {profile.profileImage2 && (
                <div>
                  <h3 className="font-semibold">Profile Image 2:</h3>
                  <Image
                    width={150}
                    height={150}
                    src={urlFor(profile.profileImage2.asset._ref)?.url() ?? ""}
                    alt="Profile Image 2"
                  />
                </div>
              )}
              {profile.profileImage3 && (
                <div>
                  <h3 className="font-semibold">Profile Image 3:</h3>
                  <Image
                    width={150}
                    height={150}
                    src={urlFor(profile.profileImage3.asset._ref)?.url() ?? ""}
                    alt="Profile Image 3"
                  />
                </div>
              )}
              {profile.extraImage && (
                <div>
                  <h3 className="font-semibold">Extra Image:</h3>
                  <Image
                    width={150}
                    height={150}
                    src={urlFor(profile.extraImage.asset._ref)?.url() ?? ""}
                    alt="Extra Image"
                  />
                </div>
              )} */}
              <div>
                <h3 className="font-semibold">Frontend Techs:</h3>
                <p className="text-gray-700">
                  {profile.frontendTechs?.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Backend Techs:</h3>
                <p className="text-gray-700">
                  {profile.backendTechs?.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">General Techs:</h3>
                <p className="text-gray-700">
                  {profile.generalTechs?.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Links:</h3>
                {profile.githubProfile && (
                  <p>
                    GitHub:{" "}
                    <Link
                      href={profile.githubProfile}
                      className="text-blue-500"
                    >
                      {profile.githubProfile}
                    </Link>
                  </p>
                )}
                {profile.linkedinProfile && (
                  <p>
                    LinkedIn:{" "}
                    <Link
                      href={profile.linkedinProfile}
                      className="text-blue-500"
                    >
                      {profile.linkedinProfile}
                    </Link>
                  </p>
                )}
                {profile.instagramProfile && (
                  <p>
                    Instagram:{" "}
                    <Link
                      href={profile.instagramProfile}
                      className="text-blue-500"
                    >
                      {profile.instagramProfile}
                    </Link>
                  </p>
                )}
                {profile.portfolioProfile && (
                  <p>
                    Portfolio:{" "}
                    <Link
                      href={profile.portfolioProfile}
                      className="text-blue-500"
                    >
                      {profile.portfolioProfile}
                    </Link>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-semibold">Active:</h3>
                <p className="text-gray-700">{profile.active ? "Yes" : "No"}</p>
              </div>
            </div>
          ))}
          {/* </DialogDescription> */}
        </div>
      </div>
    </DialogContent>
  );
}

export default ProgrammerDetails;
