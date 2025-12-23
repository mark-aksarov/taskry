import { NextRequest, NextResponse } from "next/server";
import { getCustomerSummaries } from "@/lib/dal/customers";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch customers
    const customers = await getCustomerSummaries();
    return NextResponse.json(customers);
  });
}
