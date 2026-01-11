import "server-only";

import {
  Prisma,
  TaskStatus,
  NotificationType,
} from "@/generated/prisma/client";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { canDeleteNotification } from "../user/user.dal";
import { verifySession } from "@/lib/data/utils/verifySession";

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

export const deleteNotification = async (id: number) => {
  const {
    user: { id: recipientId, workspaceId },
  } = await verifySession();

  const canDelete = await canDeleteNotification();
  if (!canDelete) {
    throw new AccessDeniedError(
      "You do not have permission to delete notifications.",
    );
  }

  return await prisma.notification.delete({
    where: {
      workspaceId,
      id,
      recipientId,
    },
  });
};

/**
 * Send notifications
 */

export async function createTaskAddedNotifications(
  tx: Prisma.TransactionClient,
  {
    task,
    actorId,
    workspaceId,
  }: {
    task: { id: number; title: string; assigneeId: string | null };
    actorId: string;
    workspaceId: number;
  },
) {
  const candidates = await getNotificationCandidates(tx, workspaceId, actorId, [
    task.assigneeId,
  ]);

  const notificationsData = candidates
    .filter((user) => {
      const isAdmin = user.role === "owner" || user.role === "manager";
      const isAssignee = user.id === task.assigneeId;
      return isAdmin || isAssignee;
    })
    .map((user) => ({
      type: NotificationType.taskAdded,
      actorId,
      recipientId: user.id,
      workspaceId,
      taskId: task.id,
      taskTitle: task.title,
      isRead: false,
    }));

  if (notificationsData.length > 0) {
    await tx.notification.createMany({ data: notificationsData });
  }
}

/**
 * Creates notifications for multiple deleted tasks.
 * Logic: owner and manager get all notifications; Assignees only get their own.
 */
export async function createTaskDeletedNotifications(
  tx: Prisma.TransactionClient,
  {
    tasks,
    actorId,
    workspaceId,
  }: {
    tasks: { title: string; assigneeId: string | null }[];
    actorId: string;
    workspaceId: number;
  },
) {
  const allAssigneeIds = tasks
    .map((t) => t.assigneeId)
    .filter(Boolean) as string[];

  const candidates = await getNotificationCandidates(
    tx,
    workspaceId,
    actorId,
    allAssigneeIds,
  );

  const notificationsData: Prisma.NotificationCreateManyInput[] = [];

  for (const task of tasks) {
    for (const user of candidates) {
      const isAdmin = user.role === "owner" || user.role === "manager";
      const isAssignee = user.id === task.assigneeId;

      // Send if user is an owner or manager (sees everything) OR the specific Assignee
      if (isAdmin || isAssignee) {
        notificationsData.push({
          type: NotificationType.taskDeleted,
          actorId,
          recipientId: user.id,
          workspaceId,
          taskTitle: task.title,
        });
      }
    }
  }

  if (notificationsData.length > 0) {
    await tx.notification.createMany({ data: notificationsData });
  }
}

/**
 * Creates notifications for multiple task status changes.
 * Logic: owner and manager get all updates; Assignees only get updates for their own tasks.
 */
export async function createTaskStatusChangedNotifications(
  tx: Prisma.TransactionClient,
  {
    tasks,
    actorId,
    workspaceId,
    newStatus,
  }: {
    tasks: {
      id: number;
      title: string;
      assigneeId: string | null;
    }[];
    actorId: string;
    workspaceId: number;
    newStatus: TaskStatus;
  },
) {
  const allAssigneeIds = tasks.map((t) => t.assigneeId);
  const candidates = await getNotificationCandidates(
    tx,
    workspaceId,
    actorId,
    allAssigneeIds,
  );

  const notificationsData: Prisma.NotificationCreateManyInput[] = [];

  for (const task of tasks) {
    for (const user of candidates) {
      const isAdmin = user.role === "owner" || user.role === "manager";
      const isAssignee = user.id === task.assigneeId;

      // Only notify if user is an Admin or the specific Assignee for this task
      if (isAdmin || isAssignee) {
        notificationsData.push({
          type: NotificationType.taskStatusChanged,
          actorId,
          recipientId: user.id,
          workspaceId,
          taskId: task.id,
          taskTitle: task.title,
          taskStatus: newStatus,
          isRead: false,
        });
      }
    }
  }

  if (notificationsData.length > 0) {
    await tx.notification.createMany({ data: notificationsData });
  }
}

/**
 * Creates notifications for deadline changes.
 * Logic: owner and manager get all notifications; Assignees only get their own.
 */
export async function createTaskDeadlineChangedNotifications(
  tx: Prisma.TransactionClient,
  {
    task,
    newDeadline,
    actorId,
    workspaceId,
  }: {
    task: { id: number; title: string; assigneeId: string | null };
    newDeadline: Date;
    actorId: string;
    workspaceId: number;
  },
) {
  const candidates = await getNotificationCandidates(tx, workspaceId, actorId, [
    task.assigneeId,
  ]);

  const notificationsData = candidates
    .filter((user) => {
      const isAdmin = user.role === "owner" || user.role === "manager";
      const isAssignee = user.id === task.assigneeId;
      return isAdmin || isAssignee;
    })
    .map((user) => ({
      type: NotificationType.taskDeadlineChanged,
      actorId,
      recipientId: user.id,
      workspaceId,
      taskId: task.id,
      taskTitle: task.title,
      taskDeadline: newDeadline,
      isRead: false,
    }));

  if (notificationsData.length > 0) {
    await tx.notification.createMany({ data: notificationsData });
  }
}

/**
 * HELPER
 */

/**
 * Fetches all potential notification recipients for the given context.
 * Candidates include workspace owners and managers and specific task assignees.
 */
async function getNotificationCandidates(
  tx: Prisma.TransactionClient,
  workspaceId: number,
  actorId: string,
  assigneeIds: (string | null)[],
) {
  const uniqueAssigneeIds = Array.from(
    new Set(assigneeIds.filter(Boolean)),
  ) as string[];

  return tx.user.findMany({
    where: {
      workspaceId,
      id: { not: actorId },
      OR: [
        { role: { in: ["owner", "manager"] } },
        { id: { in: uniqueAssigneeIds } },
      ],
    },
    select: { id: true, role: true },
  });
}
