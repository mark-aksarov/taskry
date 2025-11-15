import { ProjectsPage } from "./ProjectsPage";
import { getProjects } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { UserCheckboxGroupContainer } from "@/components/users/UserCheckboxGroup";
import { CustomerCheckboxGroupContainer } from "@/components/customer/CustomerCheckboxGroup";
import { ProjectCategoryCheckboxGroupContainer } from "@/components/projects/ProjectCategoryCheckboxGroup";
import { ProjectViewModeContainer } from "@/components/projects/ProjectViewModeContainer";
import { NewProjectFormContainer } from "@/components/projects/NewProjectForm";

export default async function AppProjectsPage() {
  const projects = await getProjects();

  if (!projects) return <ProjectsPageEmpty />;

  return (
    <ProjectsPage
      ProjectCategoryCheckboxGroupContainer={
        ProjectCategoryCheckboxGroupContainer
      }
      CustomerCheckboxGroupContainer={CustomerCheckboxGroupContainer}
      UserCheckboxGroupContainer={UserCheckboxGroupContainer}
      ProjectViewModeContainer={ProjectViewModeContainer}
      NewProjectFormContainer={NewProjectFormContainer}
    />
  );
}
