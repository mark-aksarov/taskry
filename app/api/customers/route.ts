import { withAuth } from "@/lib/api/withAuth";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerSummaries } from "@/lib/dal/customers";

export async function GET(req: NextRequest) {
  return withAuth(async (session) => {
    // Fetch customers
    const customers = await getCustomerSummaries();
    return NextResponse.json(customers);
  });
}
