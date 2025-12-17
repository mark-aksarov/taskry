import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerDetails } from "@/lib/dal/customers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validation
    const data = await params;
    const schema = z.object({ id: z.coerce.number().int().positive() });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid customer ID" },
        { status: 400 },
      );
    }
    const { id } = parse.data;

    // Find Customer
    const customer = await getCustomerDetails(id);

    return NextResponse.json(customer);
  } catch (error) {
    console.error("GET /notifications error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
