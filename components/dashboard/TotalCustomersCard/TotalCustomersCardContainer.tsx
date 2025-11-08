import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalCustomersCard } from "./TotalCustomersCard";

const getTotalCustomers = cache(async (workspaceId: number) => {
  return await prisma.customer.count({
    where: { company: { workspaceId } },
  });
});

export const TotalCustomersCardContainer = async () => {
  const totalCustomers = await getTotalCustomers(1);

  return <TotalCustomersCard totalCustomers={totalCustomers} />;
};
