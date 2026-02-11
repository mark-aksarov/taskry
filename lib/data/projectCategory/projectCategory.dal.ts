import "server-only";

import {
  ProjectCategorySummaryDTO,
  CreateProjectCategoryInputDTO,
} from "./projectCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";

export const getProjectCategoryCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.projectCategory.count({ where: { workspaceId } });
});

export const getProjectCategorySummaries = cache(
  async (): Promise<ProjectCategorySummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get project categories
    const projectCategories = await prisma.projectCategory.findMany({
      where: { workspaceId },
      select: { id: true, name: true },
    });

    return projectCategories.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
  },
);

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
