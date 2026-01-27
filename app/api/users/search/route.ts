import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "@/lib/data/user/user.service";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";

const schema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  query: z.string().optional(),
});

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Validation
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const parse = schema.safeParse(searchParams);

    if (!parse.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { page, pageSize, query } = parse.data;

    // Fetch users
    const users = await searchUsers({ page, pageSize, query });
    return NextResponse.json(users);
  });
}
