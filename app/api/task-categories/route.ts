import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/queries/task";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const categories = await getTaskCategorySummaries();
  return NextResponse.json(categories);
}
