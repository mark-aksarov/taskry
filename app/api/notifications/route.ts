import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getNotificationsList } from "@/lib/data/notification/notification.dal";

const FilterEnum = z.enum(["all", "unread"]);

export const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  filter: FilterEnum.default("all"),
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
    const data = await getNotificationsList(parsed.data);

    return NextResponse.json(data);
  });
