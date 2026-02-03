import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
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
    // Fetch customers
    const customers = await getCustomerSummaries();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
