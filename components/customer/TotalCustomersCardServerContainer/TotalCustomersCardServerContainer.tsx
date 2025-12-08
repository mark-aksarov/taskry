import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalCustomersCard } from "../TotalCustomersCard";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

const getTotalCustomers = cache(async (workspaceId: number) => {
  return await prisma.customer.count({
    where: { company: { workspaceId } },
  });
});

export const TotalCustomersCardServerContainer = async () => {
  const workspaceId = await getUserWorkspaceId();
  const totalCustomers = await getTotalCustomers(workspaceId);

  return <TotalCustomersCard totalCustomers={totalCustomers} />;
};
