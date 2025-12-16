import {
  getNotificationsList,
  getNotificationsCount,
} from "@/lib/queries/notification";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const MAX_PAGE_SIZE = 100;

const FilterEnum = z.enum(["all", "unread"]);

export const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(MAX_PAGE_SIZE).default(10),
  filter: FilterEnum.default("all"),
});

export async function GET(req: NextRequest) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validation
    const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());

    const parse = searchParamsSchema.safeParse(rawParams);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid search params" },
        { status: 400 },
      );
    }

    const { page, pageSize, filter } = parse.data;

    // Get notifications
    const [notifications, totalCount, unreadCount] = await Promise.all([
      getNotificationsList({
        page,
        pageSize,
        filter,
      }),
      getNotificationsCount(),
      getNotificationsCount({ isRead: false }),
    ]);

    const countForPagination = filter === "unread" ? unreadCount : totalCount;
    const totalPages = Math.ceil(countForPagination / pageSize);

    return NextResponse.json({
      notifications,
      totalCount,
      unreadCount,
      totalPages,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("GET /notifications error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
