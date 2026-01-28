import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  internalServerError,
  unauthorized,
} from "@/lib/utils/routeHandlerErrors";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.service";

export async function GET(req: NextRequest) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch projects
    const categories = await getTaskCategorySummaries();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
