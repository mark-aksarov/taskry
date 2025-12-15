import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerDetails } from "@/lib/queries/customers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const customer = await getCustomerDetails(Number(id));

  if (!customer) {
    return NextResponse.json("Customer not found", { status: 404 });
  }

  return NextResponse.json(customer);
}
