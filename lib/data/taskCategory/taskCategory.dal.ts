import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { CreateTaskCategoryInputDTO } from "./taskCategory.dto";

export const getAllTaskCategories = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createTaskCategory = async (input: CreateTaskCategoryInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        company: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create task categories.",
    );
  }

  // Create task category
  const taskCategory = await prisma.taskCategory.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return taskCategory;
};
