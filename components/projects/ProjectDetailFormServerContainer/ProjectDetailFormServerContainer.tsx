import { getCustomerSummaries } from "@/lib/dal/customers";
import { getProjectCategorySummaries } from "@/lib/dal/project";
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
        <ProjectDetailFormCategorySelect categories={categories} />
      }
      customerSelect={<ProjectDetailFormCustomerSelect customers={customers} />}
    />
  );
}
