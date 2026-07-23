import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getClientSummaries } from "@/lib/data/client/client.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch clients
    const clients = await getClientSummaries();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
