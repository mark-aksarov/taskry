import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
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
    // Fetch companies
    const companies = await getCompanySummaries();
    return NextResponse.json(companies);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
