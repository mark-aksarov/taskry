import {
  getCustomerDetail,
  getCustomerFormData,
} from "@/lib/data/customer/customer.dal";

import z from "zod";
import { NextRequest, NextResponse } from "next/server";
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
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const project = await getCustomerFormData(id);
      return NextResponse.json(project);
    }

    const customer = await getCustomerDetail(id);
    return NextResponse.json(customer);
  });
}
