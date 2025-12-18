import "server-only";

import {
  mapCustomerDetailToDTO,
  mapCustomerListItemDTO,
  mapCustomerSummaryToDTO,
} from "../mappers/customers";

import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export const getCustomerSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const customers = await prisma.customer.findMany({
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

  return customers.map(mapCustomerSummaryToDTO);
});

export const getCustomerDetails = cache(async (customerId: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const customer = await prisma.customer.findUniqueOrThrow({
    where: { id: customerId, workspaceId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,
      bio: true,
      workspaceId: true,

      company: {
        select: {
          name: true,
        },
      },
    },
  });

  return mapCustomerDetailToDTO(customer);
});

export const getCustomerList = cache(
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;
    const skip = (page - 1) * pageSize;

    const customers = await prisma.customer.findMany({
      where: { workspaceId },
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
          },
        },
      },
    });

    return customers.map(mapCustomerListItemDTO);
  },
);

export const getCustomerCount = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return prisma.customer.count({
    where: { workspaceId },
  });
});
