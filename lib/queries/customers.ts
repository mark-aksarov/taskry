import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";
import { auth } from "../auth";
import { headers } from "next/headers";

export type GetCustomerDetailsType = ThenArg<
  ReturnType<typeof getCustomerDetails>
>;
export const getCustomerDetails = cache(async (customerId: number) => {
  return await prisma.customer.findUnique({
    where: { id: customerId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,
      bio: true,

      company: {
        select: {
          name: true,
          workspaceId: true,
        },
      },
    },
  });
});

function getCustomerWhereClause(params: { workspaceId: number }) {
  const { workspaceId } = params;

  return {
    company: {
      workspaceId,
    },
  };
}

export type GetCustomerListType = ThenArg<ReturnType<typeof getCustomerList>>;
export const getCustomerList = cache(
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const workspaceId = session.user.workspaceId;

    const where = getCustomerWhereClause({ workspaceId });
    const skip = (page - 1) * pageSize;

    return await prisma.customer.findMany({
      where,
      skip,
      take: pageSize,

      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        publicLink: true,
        imageUrl: true,

        company: {
          select: {
            id: true,
            name: true,
            workspaceId: true,
          },
        },
      },
    });
  },
);

export const getCustomerCount = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.user.workspaceId;

  const where = getCustomerWhereClause({ workspaceId });

  return prisma.customer.count({ where });
});

export type GetCustomerSummariesType = ThenArg<
  ReturnType<typeof getCustomerSummaries>
>;
export const getCustomerSummaries = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.user.workspaceId;

  return await prisma.customer.findMany({
    where: {
      company: {
        workspaceId,
      },
    },
    select: {
      id: true,
      fullName: true,
    },
  });
});
