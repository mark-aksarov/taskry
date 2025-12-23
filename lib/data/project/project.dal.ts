import "server-only";

import {
  ProjectFilters,
  UpdateProjectInputDTO,
  CreateProjectInputDTO,
} from "./project.dto";

import {
  mapProjectDetailToDTO,
  mapProjectSummaryToDTO,
  mapProjectFormDataToDTO,
  mapProjectListItemToDTO,
} from "./project.mapper";

import {
  projectDetailSelect,
  projectSummarySelect,
  projectFormDataSelect,
  projectListItemSelect,
} from "./project.select";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { buildDateWhere } from "../utils/dateWhere";
import { getSessionOrThrow } from "@/lib/utils/getSessionOrThrow";
import { TRANSITION_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
import { Prisma, ProjectStatus, TaskStatus } from "@/generated/prisma/client";

export const getProjectSummary = cache(async (id: number) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: projectSummarySelect,
  });
  if (!data) throw new Error("Project not found");
  return mapProjectSummaryToDTO(data);
});

export const getProjectSummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const projects = await prisma.project.findMany({
    where: { workspaceId },
    select: { id: true, title: true },
  });

  return projects.map((project) => mapProjectSummaryToDTO(project));
});

export const getProjectFormData = cache(async (id: number) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: projectFormDataSelect,
  });
  if (!data) throw new Error("Project not found");
  return mapProjectFormDataToDTO(data);
});

export const getProjectDetail = cache(async (id: number) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: projectDetailSelect,
  });
  if (!data) throw new Error("Project not found");
  return mapProjectDetailToDTO(data);
});

export const getProjectList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: ProjectFilters;
  }) => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<
      string,
      Prisma.ProjectOrderByWithRelationInput
    > = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const projects = await prisma.project.findMany({
      where: buildProjectWhereClause(workspaceId, filters),
      orderBy: [orderByMapping[sort] || { title: "asc" }],
      skip,
      take: pageSize,
      select: projectListItemSelect,
    });

    return projects.map(mapProjectListItemToDTO);
  },
);

export const getProjectCount = cache(async (filters?: ProjectFilters) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters),
  });
});

/**
 * WRITE METHODS
 */

export const createProject = async (input: CreateProjectInputDTO) => {
  const {
    user: { id: creatorId, workspaceId },
  } = await getSessionOrThrow();

  await validateRelations(workspaceId, input.categoryId, input.customerId);

  return prisma.project.create({
    data: {
      ...input,
      creatorId,
      workspaceId,
    },
  });
};

export const updateProject = async (input: UpdateProjectInputDTO) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  await validateRelations(workspaceId, input.categoryId, input.customerId);

  return prisma.project.update({
    where: { id: input.id, workspaceId },
    data: input,
  });
};

export const updateProjectStatuses = async (
  ids: number[],
  nextStatus: ProjectStatus,
) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.$transaction(async (tx) => {
    await tx.project.updateMany({
      where: { id: { in: ids }, workspaceId },
      data: { status: nextStatus },
    });

    const taskRules = TRANSITION_TASK_STATUSES_BY_PROJECT[nextStatus];
    for (const [current, target] of Object.entries(taskRules)) {
      if (current === target) continue;
      await tx.task.updateMany({
        where: { projectId: { in: ids }, status: current as TaskStatus },
        data: { status: target as TaskStatus },
      });
    }
    return ids;
  });
};

export const deleteProjects = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const { count } = await prisma.project.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  if (count === 0) throw new Error("No projects deleted.");

  return count;
};

/**
 * HELPERS
 */

async function validateRelations(
  workspaceId: number,
  catId: number,
  custId?: number,
) {
  const category = await prisma.projectCategory.findFirst({
    where: { id: catId, workspaceId },
  });
  if (!category) throw new Error("Category access denied or not found");

  if (custId) {
    const customer = await prisma.customer.findFirst({
      where: { id: custId, workspaceId },
    });
    if (!customer) throw new Error("Customer access denied or not found");
  }
}

export function buildProjectWhereClause(
  workspaceId: number,
  filters?: ProjectFilters,
): Prisma.ProjectWhereInput {
  if (!filters) return { workspaceId };

  const datesWhere = buildDateWhere({
    quick: filters.deadline as any,
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd,
  });

  return {
    workspaceId,
    ...(filters.noActiveTasks && {
      tasks: { none: { status: ProjectStatus.active } },
    }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.customer?.length && { customerId: { in: filters.customer } }),
    ...(filters.user?.length && { creatorId: { in: filters.user } }),
    ...(datesWhere && { deadline: datesWhere }),
  };
}
