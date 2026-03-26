import {
  ProjectGridLarge,
  ProjectGridMobile,
} from "@/components/projects/ProjectGrid";

import {
  ProjectGridLargeStory,
  ProjectGridMobileStory,
} from "@/components/projects/ProjectGrid/__stories__";

import { mocked } from "storybook/test";
import ProjectsPageLoading from "../loading";
import { ProjectsPage } from "../ProjectsPage";
import { usePathname } from "next/navigation";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { SearchList } from "@/components/search/SearchList";
import { ProjectsPageDecorator } from "./ProjectsPageDecorator";
import { ProjectList } from "@/components/projects/ProjectList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { ProjectCreatorFiltersForm } from "@/components/projects/ProjectCreatorFiltersForm";
import { ProjectCustomerFiltersForm } from "@/components/projects/ProjectCustomerFiltersForm";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { ProjectCategoryFiltersForm } from "@/components/projects/ProjectCategoryFiltersForm";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    ProjectsPageDecorator,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    totalFilteredProjects: 10,
    selectedSortField: "createdAt",

    searchContainer: <SearchList {...SearchListStory.args} />,
    createProjectFormContainer: (
      <CreateProjectForm
        projectCategorySelectItems={mockedProjectCategorySummaries}
        customerSelectItems={mockedCustomerSummaries}
      />
    ),
    projectFiltersFormContainer: (
      <ProjectFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
        userCheckboxGroupItems={mockedUserSummaries}
        customerCheckboxGroupItems={mockedCustomerSummaries}
      />
    ),
    projectCategoryFiltersFormContainer: (
      <ProjectCategoryFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
      />
    ),
    creatorFiltersFormContainer: (
      <ProjectCreatorFiltersForm
        creatorCheckboxGroupItems={mockedUserSummaries}
      />
    ),
    customerFiltersFormContainer: (
      <ProjectCustomerFiltersForm
        customerCheckboxGroupItems={mockedCustomerSummaries}
      />
    ),
    projectsContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        listLarge={() => <ProjectList {...ProjectListStory.args} />}
        gridLarge={() => <ProjectGridLarge {...ProjectGridLargeStory.args} />}
        gridMobile={() => (
          <ProjectGridMobile {...ProjectGridMobileStory.args} />
        )}
        totalPages={3}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjects = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredProjects: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
