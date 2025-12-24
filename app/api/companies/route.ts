import { NextRequest, NextResponse } from "next/server";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch companies
    const companies = await getCompanySummaries();
    return NextResponse.json(companies);
  });
}
