import { getFileAsset } from "@sanity/asset-utils";
import ImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { Message } from "./interface";

export const client = createClient({
  apiVersion: "v2022-03-07",
  dataset: "production",
  projectId: "4hfzjbz1",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => {
  if (!source) return null;
  return builder.image(source);
};

export function getVideoUrl(assetRef: any) {
  if (!assetRef || !assetRef.asset) return null;

  const assetUrl = getFileAsset(assetRef.asset, {
    projectId: "4hfzjbz1",
    dataset: "production",
    // projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  });

  return assetUrl ? assetUrl.url : null;
}

export async function getMessages() {
  const posts = await client.fetch(
    '*[_type == "messages"]',
    {},
    {
      // You can set any of the `cache` and `next` options as you would on a standard `fetch` call
      cache: "no-cache",
      next: { tags: ["messages"] },
    }
  );
  return posts;
}

export async function createMessage(message: Message) {
  if (!message) return;
  const result = client.create(message);

  return result;
}
export async function getServerSideProps() {
  const messages = await getMessages();
  return { props: { messages } };
}
