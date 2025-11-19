import { NextRequest, NextResponse } from "next/server";
import { getProjectSummaries } from "@/lib/queries/project";

export async function GET(req: NextRequest) {
  const projects = await getProjectSummaries(1);
  return NextResponse.json(projects);
}
