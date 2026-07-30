import {
  TASK_MAX_COUNT,
  COMPANY_MAX_COUNT,
  PROJECT_MAX_COUNT,
  CUSTOMER_MAX_COUNT,
  POSITION_MAX_COUNT,
  TASK_CATEGORY_MAX_COUNT,
  PROJECT_CATEGORY_MAX_COUNT,
} from "../constants";

import {
  NotFoundError,
  ValidationError,
  AccessDeniedError,
  LimitExceededError,
} from "./error";
import prisma from "@/lib/prisma";

function validateEntities(
  entities: { organizationId: string | null }[],
  count: number,
  name: string,
  organizationId: string,
) {
  if (entities.length !== count) {
    throw new NotFoundError(`${name} not found`);
  }

  if (entities.some((entity) => entity.organizationId !== organizationId)) {
    throw new AccessDeniedError(`${name} access denied`);
  }
}

// Validate that task exists and belongs to the workspace
export async function validateTasks(organizationId: string, taskIds: number[]) {
  const tasks = await prisma.task.findMany({
    where: {
      id: {
        in: taskIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(tasks, taskIds.length, "Task", organizationId);
}

// Validate that company exists and belongs to the workspace
export async function validateCompanies(
  organizationId: string,
  companyIds: number[],
) {
  const companies = await prisma.company.findMany({
    where: {
      id: {
        in: companyIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(companies, companyIds.length, "Company", organizationId);
}

// Validate that project category exists and belongs to the workspace
export async function validateProjectCategories(
  organizationId: string,
  categoryIds: number[],
) {
  const categories = await prisma.projectCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(
    categories,
    categoryIds.length,
    "Project category",
    organizationId,
  );
}

// Validate that client exists and belongs to the workspace
export async function validateClients(
  organizationId: string,
  clientIds: number[],
) {
  const clients = await prisma.client.findMany({
    where: {
      id: {
        in: clientIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(clients, clientIds.length, "Client", organizationId);
}

// Validate that task category exists and belongs to the workspace
export async function validateTaskCategories(
  organizationId: string,
  categoryIds: number[],
) {
  const categories = await prisma.taskCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(
    categories,
    categoryIds.length,
    "Task category",
    organizationId,
  );
}

// Validate that project exists and belongs to the workspace
export async function validateProjects(
  organizationId: string,
  projectIds: number[],
) {
  const projects = await prisma.project.findMany({
    where: {
      id: {
        in: projectIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(projects, projectIds.length, "Project", organizationId);
}

// Validate that user exists and belongs to the workspace
export async function validateUsers(organizationId: string, userIds: string[]) {
  const members = await prisma.member.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(members, userIds.length, "User", organizationId);
}

// Validate that position exists and belongs to the workspace
export async function validatePositions(
  organizationId: string,
  positionIds: number[],
) {
  const positions = await prisma.position.findMany({
    where: {
      id: {
        in: positionIds,
      },
    },
    select: {
      organizationId: true,
    },
  });

  validateEntities(positions, positionIds.length, "Position", organizationId);
}

/**
 * HELPERS
 */

async function validateLimit({
  count,
  newCount = 1,
  maxCount,
  entityName,
}: {
  count: number;
  newCount?: number;
  maxCount: number;
  entityName: string;
}) {
  if (count + newCount > maxCount) {
    throw new LimitExceededError(
      `You cannot create more than ${maxCount} ${entityName}.`,
    );
  }
}

// Validate that company limit has not been reached
export async function validateCompanyLimit(
  organizationId: string,
  newCompaniesCount = 1,
) {
  const count = await prisma.company.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newCompaniesCount,
    maxCount: COMPANY_MAX_COUNT,
    entityName: "companies",
  });
}

// Validate that client limit has not been reached
export async function validateClientLimit(
  organizationId: string,
  newClientsCount = 1,
) {
  const count = await prisma.client.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newClientsCount,
    maxCount: CUSTOMER_MAX_COUNT,
    entityName: "clients",
  });
}

// Validate that position limit has not been reached
export async function validatePositionLimit(
  organizationId: string,
  newPositionsCount = 1,
) {
  const count = await prisma.position.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newPositionsCount,
    maxCount: POSITION_MAX_COUNT,
    entityName: "positions",
  });
}

// Validate that project limit has not been reached
export async function validateProjectLimit(
  organizationId: string,
  newProjectsCount = 1,
) {
  const count = await prisma.project.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newProjectsCount,
    maxCount: PROJECT_MAX_COUNT,
    entityName: "projects",
  });
}

// Validate that project category limit has not been reached
export async function validateProjectCategoryLimit(
  organizationId: string,
  newCategoriesCount = 1,
) {
  const count = await prisma.projectCategory.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newCategoriesCount,
    maxCount: PROJECT_CATEGORY_MAX_COUNT,
    entityName: "project categories",
  });
}

// Validate that task limit has not been reached
export async function validateTaskLimit(
  organizationId: string,
  newTasksCount = 1,
) {
  const count = await prisma.task.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newTasksCount,
    maxCount: TASK_MAX_COUNT,
    entityName: "tasks",
  });
}

// Validate that task category limit has not been reached
export async function validateTaskCategoryLimit(
  organizationId: string,
  newCategoriesCount = 1,
) {
  const count = await prisma.taskCategory.count({
    where: {
      organizationId,
    },
  });

  return validateLimit({
    count,
    newCount: newCategoriesCount,
    maxCount: TASK_CATEGORY_MAX_COUNT,
    entityName: "task categories",
  });
}

// Validate that user is not a member
export async function validateUserHasNoMembership(email: string) {
  const existingMember = await prisma.member.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  if (existingMember) {
    throw new ValidationError("User already member");
  }
}

// Validate that workspace is empty
export async function validateWorkspaceIsEmpty(organizationId: string) {
  const [taskCategory, projectCategory, project, task, client, company] =
    await Promise.all([
      prisma.taskCategory.findFirst({
        where: { organizationId },
      }),
      prisma.projectCategory.findFirst({
        where: { organizationId },
      }),
      prisma.project.findFirst({
        where: { organizationId },
      }),
      prisma.task.findFirst({
        where: { organizationId },
      }),
      prisma.client.findFirst({
        where: { organizationId },
      }),
      prisma.company.findFirst({
        where: { organizationId },
      }),
    ]);

  if (taskCategory || projectCategory || project || task || client || company) {
    throw new ValidationError("Workspace must be empty");
  }
}

// Validate that values exist
export function validateValuesExist(
  values: string[],
  existingValues: Set<string>,
  message: string,
) {
  const missingValues = values.filter((value) => !existingValues.has(value));

  if (missingValues.length > 0) {
    throw new NotFoundError(message);
  }
}
