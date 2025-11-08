import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CompanyCheckboxGroup } from "./CompanyCheckboxGroup";

const getCompanies = cache(async (workspaceId: number) => {
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

export async function CompanyCheckboxGroupContainer() {
  const companies = await getCompanies(1);

  if (!companies.length) {
    return null;
  }

  return <CompanyCheckboxGroup companies={companies} />;
}
