import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { SearchList } from "@/components/search/SearchList";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectGridStory } from "@/components/projects/ProjectGrid/__stories__";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateProjectProvider } from "@/components/projects/CreateProjectContext/__stories__";
import { withProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext/__stories__";
import { withDeleteProjectsProvider } from "@/components/projects/DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesContext/__stories__";
import { withCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryContext/__stories__";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateProjectCategoryProvider,
    withCreateProjectProvider,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withProjectFiltersProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
    mocked(useParams).mockReturnValue({ push: fn() } as any);
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
    newProjectFormContainer: (
      <NewProjectForm
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
    projectsContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
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
