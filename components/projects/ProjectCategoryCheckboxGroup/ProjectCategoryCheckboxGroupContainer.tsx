import { getProjectCategories } from "@/lib/queries/project";
import { ProjectCategoryCheckboxGroup } from "./ProjectCategoryCheckboxGroup";

export async function ProjectCategoryCheckboxGroupContainer() {
  const categories = await getProjectCategories(1);

  if (!categories.length) {
    return null;
  }

  return <ProjectCategoryCheckboxGroup categories={categories} />;
}
