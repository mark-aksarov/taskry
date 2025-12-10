import {
  getNotificationsList,
  getNotificationsCount,
  getNotificationsUnreadCount,
} from "@/lib/queries/notification";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user.id;

  const search = req.nextUrl.searchParams;

  const page = Number(search.get("page") ?? 1);
  const pageSize = Number(search.get("pageSize") ?? 10);
  const filter = search.get("filter") ?? "all";

  const [notifications, totalCount, unreadCount] = await Promise.all([
    getNotificationsList({
      userId,
      page,
      pageSize,
      filter,
    }),
    getNotificationsCount({ userId }),
    getNotificationsUnreadCount({ userId }),
  ]);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json({
    notifications,
    totalCount,
    unreadCount,
    totalPages: Math.ceil(
      (filter === "unread" ? unreadCount : totalCount) / pageSize,
    ),
    page,
    pageSize,
  });
}
