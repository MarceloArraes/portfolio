// app/api/createMessage/route.js

import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/app/lib/sanity";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const result = await createMessage(message);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
