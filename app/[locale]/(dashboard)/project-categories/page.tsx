import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { getProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoriesContainer } from "@/dashboard/projectCategory/ProjectCategoriesContainer";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireFullAccess();

  const projectCategories = await getProjectCategories();

  return (
    <ProjectCategoriesPage
      totalCount={projectCategories.length}
      selectedItems={projectCategories.map((p) => ({ id: p.id }))}
      projectCategoriesContainer={<ProjectCategoriesContainer />}
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
