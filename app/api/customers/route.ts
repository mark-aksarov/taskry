import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch customers
    const customers = await getCustomerSummaries();
    return NextResponse.json(customers);
  });
}
