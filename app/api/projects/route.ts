import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getProjectSummaries } from "@/lib/data/project/project.service";
import {
  internalServerError,
  unauthorized,
} from "@/lib/utils/routeHandlerErrors";

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
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
