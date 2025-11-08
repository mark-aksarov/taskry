import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CustomerCheckboxGroup } from "./CustomerCheckboxGroup";

const getCustomers = cache(async (workspaceId: number) => {
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

export async function CustomerCheckboxGroupContainer() {
  const customers = await getCustomers(1);

  if (!customers.length) {
    return null;
  }

  return <CustomerCheckboxGroup customers={customers} />;
}
