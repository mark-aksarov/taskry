import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { ProjectCategoriesPageProviders } from "./ProjectCategoriesPageProviders";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoriesPageProviders
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <ProjectCategoriesPage
        totalCount={projectCategories.length}
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
        projectCategoriesContainer={<ProjectCategoriesContainer />}
      />
    </ProjectCategoriesPageProviders>
  );
}
