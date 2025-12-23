import z from "zod";
import { withAuth } from "@/lib/api/withAuth";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerDetails } from "@/lib/dal/customers";

const schema = z.object({ id: z.coerce.number().int().positive() });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(async (session) => {
    // Validation
    const data = await params;
    const parse = schema.safeParse({ id: data.id });

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid customer ID" },
        { status: 400 },
      );
    }

    const { id } = parse.data;

    // Fetch customer
    const customer = await getCustomerDetails(id);

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer);
  });
}
