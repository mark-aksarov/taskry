import z from "zod";
import { getUserDetails } from "@/lib/dal/user";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuthRouteHandler(async () => {
    // Validation
    const data = await params;

    const schema = z.object({
      id: z.string().min(1),
    });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { id } = parse.data;

    // Fetch user
    const user = await getUserDetails(id);

    return NextResponse.json(user);
  });
}
