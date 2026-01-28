import {
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { FilterEnumParam } from "@/lib/schemas/notification";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { getNotifications } from "@/lib/data/notification/notification.service";

export const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  filter: FilterEnumParam.default("all"),
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
    const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = searchParamsSchema.safeParse(rawParams);

    if (!parsed.success) {
      return badRequest("Invalid query params");
    }

    // Fetch notifications
    const data = await getNotifications(parsed.data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
