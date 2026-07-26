import "server-only";

import {
  toCommentDTO,
  CommentListItemDTO,
  CreateCommentInputDTO,
  UpdateCommentInputDTO,
} from "./comment.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { verifyResourceAccess } from "../utils/verifyResourceAccess";
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
      user: { id: userId },
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

    // Validate task
    if (taskId) {
      await validateTasks(organizationId, [taskId]);
    }

    // Validate project
    if (projectId) {
      await validateProjects(organizationId, [projectId]);
    }

    // Get comments
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        taskId,
        projectId,
        organizationId,
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

    /*
      Map to DTO
      Owner can edit any comment, member can only edit their own comments
    */
    const { role } = await auth.api.getActiveMemberRole({
      headers: await headers(),
    });

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
    user: { id: senderId },
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        comment: ["create"],
      },
    },
  });

  if (!permissions.success) {
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
    await validateTasks(organizationId, [input.taskId]);
  }

  // Validate project
  if (input.projectId) {
    await validateProjects(organizationId, [input.projectId]);
  }

  // Create comment
  const newComment = await prisma.comment.create({
    data: {
      content: input.content,
      taskId: input.taskId,
      projectId: input.projectId,
      senderId,
      organizationId,
    },
  });

  return toCommentDTO(newComment);
};

export const deleteComment = async (commentId: number) => {
  // Authorization
  const {
    user: { id: senderId },
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        comment: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete comment.",
    );
  }

  /*
    Delete comment
    Owner can delete any comment, member can only delete their own comments
  */
  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  const deletedComment = await prisma.comment.delete({
    where: {
      ...(role === "member" ? { senderId } : {}),
      organizationId,
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
    user: { id: senderId },
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        comment: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update comment.",
    );
  }

  /*
    Update comment
    Owner can update any comment, member can only delete their own comments
  */
  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  const updatedComment = await prisma.comment.update({
    where: {
      organizationId,
      ...(role === "member" ? { senderId } : {}),
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
