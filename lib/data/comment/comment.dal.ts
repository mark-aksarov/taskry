import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { CreateCommentInputDTO } from "./comment.dto";
import { verifySession } from "../utils/verifySession";
import { createCommentAddedNotifications } from "../notification/notification.dal";
import { canCreateComment } from "../user/user.dal";

export const getAllComments = cache(
  async (taskId?: number, projectId?: number) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    return await prisma.comment.findMany({
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
  const {
    user: { id: senderId, workspaceId },
  } = await verifySession();

  const canCreate = await canCreateComment();
  if (!canCreate) throw new AccessDeniedError();

  await validateCommentRelations(workspaceId, input);

  const { attachments, ...scalarData } = input;

  return await prisma.$transaction(async (tx) => {
    const newComment = await tx.comment.create({
      data: {
        ...scalarData,
        senderId,
        workspaceId,
        attachments: attachments
          ? {
              create: attachments.map((file) => ({
                fileUrl: file.fileUrl,
                fileName: file.fileName,
                workspaceId,
              })),
            }
          : undefined,
      },
    });

    await createCommentAddedNotifications(tx, {
      comment: {
        id: newComment.id,
        content: newComment.content,
        taskId: input.taskId,
        projectId: input.projectId,
      },
      actorId: senderId,
      workspaceId,
    });

    return newComment;
  });
};

/**
 * HELPERS
 */

async function validateCommentRelations(
  workspaceId: number,
  input: CreateCommentInputDTO,
) {
  const { taskId, projectId } = input;

  if (Boolean(taskId) === Boolean(projectId)) {
    throw new Error(
      "Comment must be associated with exactly one task or project.",
    );
  }

  const relationId = taskId || projectId;
  const model = taskId ? prisma.task : prisma.project;

  const record = await (model as any).findFirst({
    where: {
      id: relationId,
      workspaceId,
    },
    select: { id: true },
  });

  if (!record) {
    const type = taskId ? "Task" : "Project";
    throw new AccessDeniedError(`${type} access denied or not found`);
  }
}
