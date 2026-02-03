import {
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { searchCustomers } from "@/lib/data/customer/customer.dal";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";

const schema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  query: z.string().optional(),
});

export async function GET(req: NextRequest) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Parse and validate
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const parse = schema.safeParse(searchParams);

    if (!parse.success) {
      return badRequest("Invalid query params");
    }

    const { page, pageSize, query } = parse.data;

    // Fetch users
    const users = await searchCustomers({ page, pageSize, query });
    return NextResponse.json(users);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
