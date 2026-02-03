import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { Prisma } from "@/generated/prisma/client";
import { requireSession } from "../utils/requireSession";
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

  await validateCommentRelations(workspaceId, input);

  const newComment = await prisma.comment.create({
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

  return newComment;
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

  // Delete comment
  const deletedComment = await prisma.comment.delete({
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

  return deletedComment;
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

  // Update comment
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

  return comment;
};

/**
 * HELPERS
 */

export const validateCommentRelations = async (
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
    const task = await prisma.task.findUnique({
      where: {
        id: input.taskId,
        workspaceId,
      },
      select: { title: true },
    });

    if (!task) {
      throw new AccessDeniedError("Task access denied or not found");
    }
  }

  // Validate Project if projectId is provided
  if (input.projectId) {
    const project = await prisma.project.findUnique({
      where: {
        id: input.projectId,
        workspaceId,
      },
      select: { title: true },
    });

    if (!project) {
      throw new AccessDeniedError("Project access denied or not found");
    }
  }
};
