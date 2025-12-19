import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerSummaries } from "@/lib/dal/customers";

export async function GET(req: NextRequest) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch customers
    const customers = await getCustomerSummaries();

    return NextResponse.json(customers);
  } catch (error) {
    console.error("GET /customers error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
