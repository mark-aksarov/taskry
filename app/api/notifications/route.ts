import {
  getNotificationsList,
  getNotificationsCount,
} from "@/lib/dal/notification";

import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

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

    const { page, pageSize, filter } = parsed.data;

    // Fetch notifications
    const [notifications, totalCount, unreadCount] = await Promise.all([
      getNotificationsList({ page, pageSize, filter }),
      getNotificationsCount(),
      getNotificationsCount({ isRead: false }),
    ]);

    const countForPagination = filter === "unread" ? unreadCount : totalCount;

    return NextResponse.json({
      notifications,
      totalCount,
      unreadCount,
      totalPages: Math.ceil(countForPagination / pageSize),
      page,
      pageSize,
    });
  });
