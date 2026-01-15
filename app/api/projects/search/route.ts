import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { searchProjects } from "@/lib/data/project/project.service";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

const schema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().positive().max(100).catch(10),
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

    // Fetch tasks
    const users = await searchProjects({ page, pageSize, query });
    return NextResponse.json(users);
  });
}
