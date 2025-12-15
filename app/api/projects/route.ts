import { NextRequest, NextResponse } from "next/server";
import { getProjectSummaries } from "@/lib/queries/project";

export async function GET(req: NextRequest) {
  const projects = await getProjectSummaries();
  return NextResponse.json(projects);
}
