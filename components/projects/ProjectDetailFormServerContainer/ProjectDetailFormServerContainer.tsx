import { getCustomerSummaries } from "@/lib/data/customers";
import { getProjectCategorySummaries } from "@/lib/data/project";
import { ProjectDetailForm } from "../ProjectDetailForm/ProjectDetailForm";
import { ProjectDetailFormStatusSelect } from "../ProjectDetailForm/ProjectDetailFormStatusSelect";
import { ProjectDetailFormCategorySelect } from "../ProjectDetailForm/ProjectDetailFormCategorySelect";
import { ProjectDetailFormCustomerSelect } from "../ProjectDetailForm/ProjectDetailFormCustomerSelect";

export async function ProjectDetailFormServerContainer() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <ProjectDetailForm
      statusSelect={<ProjectDetailFormStatusSelect />}
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
