import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch task categories
    const categories = await getTaskCategorySummaries();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
