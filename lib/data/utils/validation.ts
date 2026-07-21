import prisma from "@/lib/prisma";
import { AccessDeniedError, LimitExceededError, NotFoundError } from "./error";
import {
  COMPANY_MAX_COUNT,
  CUSTOMER_MAX_COUNT,
  POSITION_MAX_COUNT,
  PROJECT_CATEGORY_MAX_COUNT,
  PROJECT_MAX_COUNT,
  TASK_CATEGORY_MAX_COUNT,
  TASK_MAX_COUNT,
} from "../constants";

function validateEntities(
  entities: { workspaceId: number }[],
  count: number,
  name: string,
  workspaceId: number,
) {
  if (entities.length !== count) {
    throw new NotFoundError(`${name} not found`);
  }

  if (entities.some((entity) => entity.workspaceId !== workspaceId)) {
    throw new AccessDeniedError(`${name} access denied`);
  }
}

// Validate that task exists and belongs to the workspace
export async function validateTasks(workspaceId: number, taskIds: number[]) {
  const tasks = await prisma.task.findMany({
    where: {
      id: {
        in: taskIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(tasks, taskIds.length, "Task", workspaceId);
}

// Validate that company exists and belongs to the workspace
export async function validateCompanies(
  workspaceId: number,
  companyIds: number[],
) {
  const companies = await prisma.company.findMany({
    where: {
      id: {
        in: companyIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(companies, companyIds.length, "Company", workspaceId);
}

// Validate that project category exists and belongs to the workspace
export async function validateProjectCategories(
  workspaceId: number,
  categoryIds: number[],
) {
  const categories = await prisma.projectCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(
    categories,
    categoryIds.length,
    "Project category",
    workspaceId,
  );
}

// Validate that customer exists and belongs to the workspace
export async function validateCustomers(
  workspaceId: number,
  customerIds: number[],
) {
  const customers = await prisma.customer.findMany({
    where: {
      id: {
        in: customerIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(customers, customerIds.length, "Customer", workspaceId);
}

// Validate that task category exists and belongs to the workspace
export async function validateTaskCategories(
  workspaceId: number,
  categoryIds: number[],
) {
  const categories = await prisma.taskCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(
    categories,
    categoryIds.length,
    "Task category",
    workspaceId,
  );
}

// Validate that project exists and belongs to the workspace
export async function validateProjects(
  workspaceId: number,
  projectIds: number[],
) {
  const projects = await prisma.project.findMany({
    where: {
      id: {
        in: projectIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(projects, projectIds.length, "Project", workspaceId);
}

// Validate that user exists and belongs to the workspace
export async function validateUsers(workspaceId: number, userIds: string[]) {
  const assignees = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(assignees, userIds.length, "User", workspaceId);
}

// Validate that position exists and belongs to the workspace
export async function validatePositions(
  workspaceId: number,
  positionIds: number[],
) {
  const positions = await prisma.position.findMany({
    where: {
      id: {
        in: positionIds,
      },
    },
    select: {
      workspaceId: true,
    },
  });

  validateEntities(positions, positionIds.length, "Position", workspaceId);
}

/**
 * HELPERS
 */

type LimitModel = {
  count: (args: {
    where: {
      workspaceId: number;
    };
  }) => Promise<number>;
};

async function validateLimit({
  model,
  workspaceId,
  newCount = 1,
  maxCount,
  entityName,
}: {
  model: LimitModel;
  workspaceId: number;
  newCount?: number;
  maxCount: number;
  entityName: string;
}) {
  const existingCount = await model.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newCount > maxCount) {
    throw new LimitExceededError(
      `You cannot create more than ${maxCount} ${entityName}.`,
    );
  }
}

// Validate that company limit has not been reached
export function validateCompanyLimit(
  workspaceId: number,
  newCompaniesCount = 1,
) {
  return validateLimit({
    model: prisma.company,
    workspaceId,
    newCount: newCompaniesCount,
    maxCount: COMPANY_MAX_COUNT,
    entityName: "companies",
  });
}

// Validate that customer limit has not been reached
export function validateCustomerLimit(
  workspaceId: number,
  newCustomersCount = 1,
) {
  return validateLimit({
    model: prisma.customer,
    workspaceId,
    newCount: newCustomersCount,
    maxCount: CUSTOMER_MAX_COUNT,
    entityName: "customers",
  });
}

// Validate that position limit has not been reached
export function validatePositionLimit(
  workspaceId: number,
  newPositionsCount = 1,
) {
  return validateLimit({
    model: prisma.position,
    workspaceId,
    newCount: newPositionsCount,
    maxCount: POSITION_MAX_COUNT,
    entityName: "positions",
  });
}

// Validate that project limit has not been reached
export function validateProjectLimit(
  workspaceId: number,
  newProjectsCount = 1,
) {
  return validateLimit({
    model: prisma.project,
    workspaceId,
    newCount: newProjectsCount,
    maxCount: PROJECT_MAX_COUNT,
    entityName: "projects",
  });
}

// Validate that project category limit has not been reached
export function validateProjectCategoryLimit(
  workspaceId: number,
  newCategoriesCount = 1,
) {
  return validateLimit({
    model: prisma.projectCategory,
    workspaceId,
    newCount: newCategoriesCount,
    maxCount: PROJECT_CATEGORY_MAX_COUNT,
    entityName: "project categories",
  });
}

// Validate that task limit has not been reached
export function validateTaskLimit(workspaceId: number, newTasksCount = 1) {
  return validateLimit({
    model: prisma.task,
    workspaceId,
    newCount: newTasksCount,
    maxCount: TASK_MAX_COUNT,
    entityName: "tasks",
  });
}

// Validate that task category limit has not been reached
export function validateTaskCategoryLimit(
  workspaceId: number,
  newCategoriesCount = 1,
) {
  return validateLimit({
    model: prisma.taskCategory,
    workspaceId,
    newCount: newCategoriesCount,
    maxCount: TASK_CATEGORY_MAX_COUNT,
    entityName: "task categories",
  });
}
