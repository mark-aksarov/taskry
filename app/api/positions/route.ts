import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export async function GET(req: NextRequest) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch positions
    const positions = await getPositionSummaries();
    return NextResponse.json(positions);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
