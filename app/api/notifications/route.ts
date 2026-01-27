import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { FilterEnumParam } from "@/lib/schemas/notification";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { getNotifications } from "@/lib/data/notification/notification.service";

export const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  filter: FilterEnumParam.default("all"),
});

export const GET = (req: NextRequest) =>
  withAuthRouteHandler(async () => {
    // Validation
    const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = searchParamsSchema.safeParse(rawParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid search params" },
        { status: 400 },
      );
    }

    // Fetch notifications
    const data = await getNotifications(parsed.data);

    return NextResponse.json(data);
  });
