// pages/api/messages.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getMessages } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const messages = await getMessages();
    return NextResponse.json({ success: true, messages });
    // res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
