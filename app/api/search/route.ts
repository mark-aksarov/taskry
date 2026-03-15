import {
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSearchKeywords } from "@/lib/data/searchKeyword/searchKeyword.dal";

const schema = z.object({
  query: z.string().max(255).optional(),
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

    const { query } = parse.data;

    // Fetch keywords
    const keywords = await getSearchKeywords({ query });
    return NextResponse.json(keywords);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
