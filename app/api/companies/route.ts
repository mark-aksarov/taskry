import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getCompanySummaries } from "@/lib/data/company/company.service";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch companies
    const companies = await getCompanySummaries();
    return NextResponse.json(companies);
  });
}
