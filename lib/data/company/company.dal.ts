import "server-only";

import {
  CompanyDTO,
  mapToCompanyDTO,
  UpdateCompanyInputDTO,
  CreateCompanyInputDTO,
} from "./company.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { validateCompanyLimit } from "../utils/validation";

export const getCompanyCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.company.count({ where: { workspaceId } });
});

export const getCompanies = cache(async () => {
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

  return companies.map(mapToCompanyDTO);
});

export const updateCompany = async (
  input: UpdateCompanyInputDTO,
): Promise<CompanyDTO> => {
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

  return mapToCompanyDTO(updatedCompany);
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
  const companies = await prisma.company.createManyAndReturn({
    data: input.map((company) => ({
      name: company.name,
      workspaceId,
    })),
  });

  return companies.map(mapToCompanyDTO);
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
  const result = await prisma.company.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};
