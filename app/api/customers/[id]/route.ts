import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

const schema = z.object({ id: z.coerce.number().int().positive() });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuthRouteHandler(async () => {
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
    const customer = await getCustomerDetail(id);

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer);
  });
}
