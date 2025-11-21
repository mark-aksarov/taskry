import { getCustomerSummaries } from "@/lib/queries/customers";
import { getProjectStatusSummaries } from "@/lib/queries/project";
import { getProjectCategorySummaries } from "@/lib/queries/project";
import { ProjectDetailForm } from "../ProjectDetailForm/ProjectDetailForm";
import { ProjectDetailFormStatusSelect } from "../ProjectDetailForm/ProjectDetailFormStatusSelect";
import { ProjectDetailFormCategorySelect } from "../ProjectDetailForm/ProjectDetailFormCategorySelect";
import { ProjectDetailFormCustomerSelect } from "../ProjectDetailForm/ProjectDetailFormCustomerSelect";

export async function ProjectDetailFormServerContainer() {
  const statuses = await getProjectStatusSummaries();
  const categories = await getProjectCategorySummaries(1);
  const customers = await getCustomerSummaries(1);

  return (
    <ProjectDetailForm
      statusSelect={
        <ProjectDetailFormStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
      categorySelect={
        <ProjectDetailFormCategorySelect
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      }
      customerSelect={
        <ProjectDetailFormCustomerSelect
          customers={customers.map((c) => ({ id: c.id, fullName: c.fullName }))}
        />
      }
    />
  );
}
