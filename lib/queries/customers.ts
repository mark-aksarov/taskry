import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetCustomerDetailsType = ThenArg<
  ReturnType<typeof getCustomerDetails>
>;
export const getCustomerDetails = cache(async (customerId: number) => {
  return await prisma.customer.findUniqueOrThrow({
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

export type GetCustomersType = ThenArg<ReturnType<typeof getCustomers>>;
export const getCustomers = cache(async (workspaceId: number) => {
  return await prisma.customer.findMany({
    where: {
      company: {
        workspaceId,
      },
    },
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
});

export type GetCustomerSummariesType = ThenArg<
  ReturnType<typeof getCustomerSummaries>
>;
export const getCustomerSummaries = cache(async (workspaceId: number) => {
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
