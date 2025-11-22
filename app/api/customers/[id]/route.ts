import { NextRequest, NextResponse } from "next/server";
import { getCustomerDetails } from "@/lib/queries/customers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const task = await getCustomerDetails(Number(id));
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
}
