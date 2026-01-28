import {
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserDetail } from "@/lib/data/user/user.service";

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

    const schema = z.object({
      id: z.string().min(1),
    });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return badRequest("Invalid user ID");
    }

    const { id } = parse.data;

    // Fetch user
    const user = await getUserDetail(id);

    return NextResponse.json(user);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
