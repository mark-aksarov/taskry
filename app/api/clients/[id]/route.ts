import {
  badRequest,
  unauthorized,
  internalServerError,
  notFound,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { clientId } from "@/lib/schemas/client";
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/data/client/client.dal";
import { getClientDetail } from "@/lib/data/client/client.dal";

const schema = z.object({ id: clientId });

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
      return badRequest("Invalid client ID");
    }

    const { id } = parse.data;

    // Fetch client
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const client = await getClient(id);

      if (!client) {
        return notFound("Client not found");
      }

      return NextResponse.json(client);
    }

    const client = await getClientDetail(id);

    if (!client) {
      return notFound("Client not found");
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
