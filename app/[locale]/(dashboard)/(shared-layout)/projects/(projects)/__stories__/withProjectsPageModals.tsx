import { Decorator } from "@storybook/nextjs-vite";
import { mockedUserSummaries } from "@/mocks/users";
import { SearchList } from "@/components/search/SearchList";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { ProjectSearchModal } from "@/components/projects/ProjectSearchModal";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectFiltersModal } from "@/components/projects/ProjectFiltersModal";
import { ProjectCreatorFiltersForm } from "@/components/projects/ProjectCreatorFiltersForm";
import { ProjectCategoryFiltersForm } from "@/components/projects/ProjectCategoryFiltersForm";
import { ProjectCreatorFiltersModal } from "@/components/projects/ProjectCreatorFiltersModal";
import { ProjectCustomerFiltersForm } from "@/components/projects/ProjectCustomerFiltersForm";
import { ProjectCustomerFiltersModal } from "@/components/projects/ProjectCustomerFiltersModal";
import { ProjectCategoryFiltersModal } from "@/components/projects/ProjectCategoryFiltersModal";
import { CreateProjectCategoryModal } from "@/components/projectCategory/CreateProjectCategoryModal";

export const withProjectsPageModals: Decorator = (Story) => {
  return (
    <>
      <Story />

      <ProjectSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
      <CreateProjectModal
        createProjectFormContainer={
          <CreateProjectForm
            projectCategorySelectItems={mockedProjectCategorySummaries}
            customerSelectItems={mockedCustomerSummaries}
          />
        }
      />
      <CreateProjectCategoryModal />
      <ProjectFiltersModal
        filtersFormContainer={
          <ProjectFiltersForm
            categoryCheckboxGroupItems={mockedProjectCategorySummaries}
            userCheckboxGroupItems={mockedUserSummaries}
            customerCheckboxGroupItems={mockedCustomerSummaries}
          />
        }
      />
      <ProjectCustomerFiltersModal
        filtersFormContainer={
          <ProjectCustomerFiltersForm
            customerCheckboxGroupItems={mockedCustomerSummaries}
          />
        }
      />
      <ProjectCategoryFiltersModal
        filtersFormContainer={
          <ProjectCategoryFiltersForm
            categoryCheckboxGroupItems={mockedProjectCategorySummaries}
          />
        }
      />
      <ProjectCreatorFiltersModal
        filtersFormContainer={
          <ProjectCreatorFiltersForm
            creatorCheckboxGroupItems={mockedUserSummaries}
          />
        }
      />
    </>
  );
};
