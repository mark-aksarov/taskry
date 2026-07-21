import "server-only";

import {
  CommentDTO,
  CommentListItemDTO,
  CreateCommentInputDTO,
  toCommentDTO,
  UpdateCommentInputDTO,
} from "./comment.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireSession } from "../utils/requireSession";
import { ValidationError, AccessDeniedError } from "../utils/error";
import { validateProjects, validateTasks } from "../utils/validation";

export const getCommentList = cache(
  async ({
    taskId,
    projectId,
  }: {
    taskId?: number;
    projectId?: number;
  }): Promise<CommentListItemDTO[]> => {
    // Authorization
    const {
      user: { id: userId, role, workspaceId },
    } = await requireSession();

    // Validate task
    if (taskId) {
      await validateTasks(workspaceId, [taskId]);
    }

    // Validate project
    if (projectId) {
      await validateProjects(workspaceId, [projectId]);
    }

    // Get comments
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        taskId,
        projectId,
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
      },
    });

    // Map to DTO
    return comments.map((c) => {
      return {
        id: c.id,
        content: c.content,
        createdAt: c.createdAt.toISOString(),

        canEdit: role === "owner" || c.sender.id === userId,

        sender: {
          id: c.sender.id,
          fullName: c.sender.fullName,
          imageUrl: c.sender.imageUrl ?? undefined,
        },
      };
    });
  },
);

export const createComment = async (input: CreateCommentInputDTO) => {
  // Authorization
  const {
    user: { id: senderId, workspaceId },
  } = await requireSession();

  // Check permission
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

  // Validate that comment is associated with exactly one task or project
  if (Boolean(input.taskId) === Boolean(input.projectId)) {
    throw new ValidationError(
      "Comment must be associated with exactly one task or project.",
    );
  }

  // Validate task
  if (input.taskId) {
    await validateTasks(workspaceId, [input.taskId]);
  }

  // Validate project
  if (input.projectId) {
    await validateProjects(workspaceId, [input.projectId]);
  }

  // Create comment
  const newComment = await prisma.comment.create({
    data: {
      content: input.content,
      taskId: input.taskId,
      projectId: input.projectId,
      senderId,
      workspaceId,
    },
  });

  return toCommentDTO(newComment);
};

export const deleteComment = async (commentId: number) => {
  // Authorization
  const {
    user: { id: senderId, role, workspaceId },
  } = await requireSession();

  // Check permission
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
      senderId: true,
    },
  });

  return toCommentDTO(deletedComment);
};

export const updateComment = async (input: UpdateCommentInputDTO) => {
  // Authorization
  const {
    user: { id: senderId, role, workspaceId },
  } = await requireSession();

  // Check permission
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
  const updatedComment = await prisma.comment.update({
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

  return toCommentDTO(updatedComment);
};
