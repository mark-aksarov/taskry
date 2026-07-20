import "server-only";

import {
  CompanySummaryDTO,
  CreateCompanyInputDTO,
  UpdateCompanyInputDTO,
} from "./company.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError, LimitExceededError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { COMPANY_MAX_COUNT } from "../constants";

export const getCompanyCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.company.count({ where: { workspaceId } });
});

export const getCompanySummaries = cache(
  async (): Promise<CompanySummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get companies
    const companies = await prisma.company.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return companies;
  },
);

export const updateCompany = async (input: UpdateCompanyInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        company: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update companies.",
    );
  }

  // Update company
  const updatedCompany = await prisma.company.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      name: input.name,
    },
  });

  return updatedCompany;
};

export const createCompany = async (input: CreateCompanyInputDTO) => {
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
      "You do not have permission to create companies.",
    );
  }

  // Validate limit
  await validateCompanyLimit(workspaceId);

  // Create company
  const company = await prisma.company.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return company;
};

export const createCompanies = async (input: CreateCompanyInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        company: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create companies.",
    );
  }

  // Validate limit
  await validateCompanyLimit(workspaceId, input.length);

  // Create companies
  const companies = await prisma.company.createMany({
    data: input.map((company) => ({
      name: company.name,
      workspaceId,
    })),
  });

  return companies;
};

export const deleteCompanies = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        company: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete companies.",
    );
  }

  // Bulk delete companies within the workspace
  const deletedCompanies = await prisma.company.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedCompanies;
};

/**
 * HELPERS
 */

// Validate that company limit has not been reached
async function validateCompanyLimit(
  workspaceId: number,
  newCompaniesCount = 1,
) {
  const existingCount = await prisma.company.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newCompaniesCount > COMPANY_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${COMPANY_MAX_COUNT} companies.`,
    );
  }
}
