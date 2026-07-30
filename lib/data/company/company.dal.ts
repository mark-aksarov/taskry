import "server-only";

import {
  CompanyDTO,
  UpdateCompanyInputDTO,
  CreateCompanyInputDTO,
} from "./company.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { Company } from "@/generated/prisma/client";
import { validateCompanyLimit } from "../utils/validation";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

export const getCompanyCount = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.company.count({ where: { organizationId } });
});

export const getCompanies = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Get companies
  const companies = await prisma.company.findMany({
    where: {
      organizationId,
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

export const exportCompanies = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Get companies
  const companies = await prisma.company.findMany({
    where: {
      organizationId,
    },
    select: {
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return companies.map((company) => ({ name: company.name }));
});

export const updateCompany = async (
  input: UpdateCompanyInputDTO,
): Promise<CompanyDTO> => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        company: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update companies.",
    );
  }

  // Update company
  const updatedCompany = await prisma.company.update({
    where: {
      id: input.id,
      organizationId,
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        company: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create companies.",
    );
  }

  // Validate limit
  await validateCompanyLimit(organizationId, input.length);

  // Create companies
  const companies = await prisma.company.createManyAndReturn({
    data: input.map((company) => ({
      name: company.name,
      organizationId,
    })),
  });

  return companies.map(mapToCompanyDTO);
};

export const deleteCompanies = async (ids: number[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        company: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete companies.",
    );
  }

  // Bulk delete companies within the workspace
  const result = await prisma.company.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return result;
};

/**
 * Helpers
 */

function mapToCompanyDTO(company: Pick<Company, "id" | "name">): CompanyDTO {
  return {
    id: company.id,
    name: company.name,
  };
}
