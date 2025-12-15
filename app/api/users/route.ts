import { NextRequest, NextResponse } from "next/server";
import { getUserSummaries } from "@/lib/queries/user";

export async function GET(req: NextRequest) {
  const statuses = await getUserSummaries();
  return NextResponse.json(statuses);
}
