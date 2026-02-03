import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { CreateCompanyInputDTO } from "./company.dto";
import { requireSession } from "../utils/requireSession";

export const getAllCompanies = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.company.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });
});

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

  // Create company
  const company = await prisma.company.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return company;
};
