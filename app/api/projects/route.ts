import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getProjectSummaries } from "@/lib/data/project/project.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch projects
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
