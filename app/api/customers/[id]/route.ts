import {
  badRequest,
  unauthorized,
  internalServerError,
  notFound,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { customerId } from "@/lib/schemas/customer";
import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/data/customer/customer.dal";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";

const schema = z.object({ id: customerId });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Parse and validate
    const data = await params;
    const parse = schema.safeParse({ id: data.id });

    if (!parse.success) {
      return badRequest("Invalid customer ID");
    }

    const { id } = parse.data;

    // Fetch customer
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const customer = await getCustomer(id);

      if (!customer) {
        return notFound("Customer not found");
      }

      return NextResponse.json(customer);
    }

    const customer = await getCustomerDetail(id);

    if (!customer) {
      return notFound("Customer not found");
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
