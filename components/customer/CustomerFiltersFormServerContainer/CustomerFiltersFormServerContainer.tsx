"server only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../CustomerFiltersForm";

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

export async function CustomerFiltersFormServerContainer() {
  const companies = await getCompanies(1);

  return (
    <CustomerFiltersForm
      companyCheckboxGroup={
        <CustomerFiltersFormCompanyCheckboxGroup companies={companies} />
      }
    />
  );
}
