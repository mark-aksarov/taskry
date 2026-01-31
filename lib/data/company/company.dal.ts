import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { CreateCompanyInputDTO } from "./company.dto";
import { requireSession } from "../utils/requireSession";
import { NotificationType } from "@/generated/prisma/enums";
import { getNotificationRecipients } from "../notification/notification.dal";

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

  return prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: input.name,
        workspaceId,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.companyAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          companyId: company.id,
          companyName: company.name,
          isRead: false,
        })),
      });
    }

    return company;
  });
};
