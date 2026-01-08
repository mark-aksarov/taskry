import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/data/utils/verifySession";
import { NotificationType, Prisma, Task } from "@/generated/prisma/client";

export const getAllNotifications = cache(
  async ({
    page,
    pageSize,
    filter,
  }: {
    page: number;
    pageSize: number;
    filter?: "unread" | "all";
  }) => {
    const {
      user: { workspaceId, id: recipientId },
    } = await verifySession();

    const skip = (page - 1) * pageSize;
    const baseWhere = { recipientId, workspaceId };

    const listWhere = {
      ...baseWhere,
      ...(filter === "unread" && { isRead: false }),
    };

    const [notifications, totalCount, unreadCount] = await prisma.$transaction([
      prisma.notification.findMany({
        where: listWhere,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          createdAt: true,
          updatedAt: true,
          isRead: true,

          projectTitle: true,
          projectDeadline: true,
          projectStatus: true,

          taskTitle: true,
          taskDeadline: true,
          taskStatus: true,

          commentContent: true,

          actor: {
            select: {
              id: true,
              fullName: true,
              imageUrl: true,
            },
          },

          project: {
            select: {
              id: true,
              title: true,
              deadline: true,
              status: true,
            },
          },

          task: {
            select: {
              id: true,
              title: true,
              deadline: true,
              status: true,
            },
          },

          comment: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      }),

      prisma.notification.count({ where: baseWhere }),
      prisma.notification.count({ where: { ...baseWhere, isRead: false } }),
    ]);

    return { items: notifications, totalCount, unreadCount };
  },
);

export async function createTaskAddedNotifications(
  tx: Prisma.TransactionClient,
  {
    task,
    actorId,
    workspaceId,
  }: {
    task: Task;
    actorId: string;
    workspaceId: number;
  },
) {
  const orConditions: Prisma.UserWhereInput[] = [
    { role: "owner" },
    { role: "manager" },
  ];

  if (task.assigneeId) {
    orConditions.push({ id: task.assigneeId });
  }

  const recipients = await tx.user.findMany({
    where: {
      workspaceId,
      id: { not: actorId },
      OR: orConditions,
    },
    select: { id: true },
  });

  if (!recipients.length) return;

  await tx.notification.createMany({
    data: recipients.map((user) => ({
      type: NotificationType.taskAdded,
      actorId: actorId,
      isRead: false,
      recipientId: user.id,
      workspaceId,
      taskId: task.id,
      taskTitle: task.title,
      taskDeadline: task.deadline,
      taskStatus: task.status,
    })),
  });
}
