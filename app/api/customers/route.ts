import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";

export async function GET() {
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
