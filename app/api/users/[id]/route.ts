import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserDetails } from "@/lib/dal/user";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error) {
    console.error("GET /user error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
