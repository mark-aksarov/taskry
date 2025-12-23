import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { ProjectDetailForm } from "../ProjectDetailForm/ProjectDetailForm";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
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
