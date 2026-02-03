import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { CreateProjectCategoryInputDTO } from "./projectCategory.dto";

export const getAllProjectCategories = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createProjectCategory = async (
  input: CreateProjectCategoryInputDTO,
) => {
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
      "You do not have permission to create project categories.",
    );
  }

  // Create project category
  const projectCategory = await prisma.projectCategory.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return projectCategory;
};
