import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { NotificationType, Prisma } from "@/generated/prisma/client";
import { getNotificationRecipients } from "../notification/notification.dal";
import { CreateCommentInputDTO, UpdateCommentInputDTO } from "./comment.dto";

export const getAllComments = cache(
  async (taskId?: number, projectId?: number) => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    return await prisma.comment.findMany({
      where: {
        taskId: taskId ?? Prisma.skip,
        projectId: projectId ?? Prisma.skip,
        workspaceId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,

        sender: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },
        attachments: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
      },
    });
  },
);

export const createComment = async (input: CreateCommentInputDTO) => {
  // Authorization
  const {
    user: { id: senderId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: senderId,
      permission: {
        comment: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create comment.",
    );
  }

  return await prisma.$transaction(async (tx) => {
    // Use the results (titles) for notifications later
    const { task, project } = await validateCommentRelations(
      tx,
      workspaceId,
      input,
    );

    const newComment = await tx.comment.create({
      data: {
        content: input.content,
        taskId: input.taskId ?? Prisma.skip,
        projectId: input.projectId ?? Prisma.skip,
        senderId,
        workspaceId,
        attachments: input.attachments
          ? {
              create: input.attachments.map((file) => ({
                fileUrl: file.fileUrl,
                fileName: file.fileName,
                workspaceId,
              })),
            }
          : Prisma.skip,
      },
    });

    const recipients = await getNotificationRecipients(
      tx,
      workspaceId,
      senderId,
    );

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: "commentAdded",
          actorId: senderId,
          recipientId: user.id,
          workspaceId,
          commentId: newComment.id,
          taskId: newComment.taskId,
          projectId: newComment.projectId,
          commentContent: newComment.content.substring(0, 250),
          taskTitle: task ? task.title : Prisma.skip,
          projectTitle: project ? project.title : Prisma.skip,
          isRead: false,
        })),
      });
    }

    return newComment;
  });
};

export const deleteComment = async (commentId: number) => {
  // Authorization
  const {
    user: { id: senderId, role, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: senderId,
      permission: {
        comment: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete comment.",
    );
  }

  return prisma.$transaction(async (tx) => {
    // delete comment within the workspace
    const deletedComment = await tx.comment.delete({
      where: {
        ...(role === "user" ? { senderId } : {}),
        workspaceId,
        id: commentId,
      },
      select: {
        id: true,
        content: true,
        taskId: true,
        projectId: true,
        project: {
          select: { title: true },
        },
        task: {
          select: { title: true },
        },
      },
    });

    // Send notifications
    const recipients = await getNotificationRecipients(
      tx,
      workspaceId,
      senderId,
    );

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: "commentDeleted",
          actorId: senderId,
          recipientId: user.id,
          workspaceId,
          taskId: deletedComment.taskId,
          projectId: deletedComment.projectId,
          commentContent: deletedComment.content.substring(0, 250),
          taskTitle: deletedComment.task
            ? deletedComment.task.title
            : Prisma.skip,
          projectTitle: deletedComment.project
            ? deletedComment.project.title
            : Prisma.skip,
          isRead: false,
        })),
      });
    }

    return deletedComment;
  });
};

export const updateComment = async (input: UpdateCommentInputDTO) => {
  // Authorization
  const {
    user: { id: senderId, role, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: senderId,
      permission: {
        comment: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update comment.",
    );
  }

  return prisma.$transaction(async (tx) => {
    // update comment within the workspace
    const comment = await prisma.comment.update({
      where: {
        workspaceId,
        ...(role === "user" ? { senderId } : {}),
        id: input.id,
      },
      data: {
        content: input.content,
      },
      include: {
        task: {
          select: { title: true },
        },
        project: {
          select: { title: true },
        },
      },
    });

    // Send notifications
    const recipients = await getNotificationRecipients(
      tx,
      workspaceId,
      senderId,
    );

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.commentChanged,
          actorId: senderId,
          recipientId: user.id,
          workspaceId,
          taskId: comment.taskId,
          projectId: comment.projectId,
          commentContent: comment.content.substring(0, 250),
          taskTitle: comment.task ? comment.task.title : Prisma.skip,
          projectTitle: comment.project ? comment.project.title : Prisma.skip,
          isRead: false,
        })),
      });
    }

    return comment;
  });
};

/**
 * HELPERS
 */

export const validateCommentRelations = async (
  tx: Prisma.TransactionClient,
  workspaceId: number,
  input: { taskId?: number | null; projectId?: number | null },
) => {
  if (Boolean(input.taskId) === Boolean(input.projectId)) {
    throw new Error(
      "Comment must be associated with exactly one task or project.",
    );
  }

  // Validate Task if taskId is provided
  if (input.taskId) {
    const task = await tx.task.findUnique({
      where: {
        id: input.taskId,
        workspaceId,
      },
      select: { title: true },
    });

    if (!task) {
      throw new AccessDeniedError("Task access denied or not found");
    }

    return { task };
  }

  // Validate Project if projectId is provided
  if (input.projectId) {
    const project = await tx.project.findUnique({
      where: {
        id: input.projectId,
        workspaceId,
      },
      select: { title: true },
    });

    if (!project) {
      throw new AccessDeniedError("Project access denied or not found");
    }

    return { project };
  }

  return {};
};
