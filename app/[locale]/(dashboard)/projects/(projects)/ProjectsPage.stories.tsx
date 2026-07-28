import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { usePathname } from "next/navigation";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CreateProjectForm } from "@/dashboard/projects/CreateProjectForm";
import { ProjectFiltersForm } from "@/dashboard/projects/ProjectFiltersForm";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { ProjectGridExample } from "@/dashboard/projects/ProjectGrid/__stories__";
import { ProjectClientFiltersForm } from "@/dashboard/projects/ProjectClientFiltersForm";
import { ProjectCreatorFiltersForm } from "@/dashboard/projects/ProjectCreatorFiltersForm";
import { ProjectCategoryFiltersForm } from "@/dashboard/projects/ProjectCategoryFiltersForm";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 1,
    totalCount: 10,
    categoryCount: 2,
    clientCount: 3,
    totalFilteredProjects: 3,
    selectedSortField: "createdAt",
    selectedItems: [],
    filters: {},
    projectGrid: <ProjectGridExample />,
    searchContainer: <SearchListExample />,
    createProjectFormContainer: (
      <CreateProjectForm
        projectCategorySelectItems={mockedProjectCategorySummaries}
        clientSelectItems={mockedClientSummaries}
      />
    ),
    projectFiltersFormContainer: (
      <ProjectFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
        userCheckboxGroupItems={mockedUserSummaries}
        clientCheckboxGroupItems={mockedClientSummaries}
      />
    ),
    projectClientFiltersFormContainer: (
      <ProjectClientFiltersForm
        clientCheckboxGroupItems={mockedClientSummaries}
      />
    ),
    projectCategoryFiltersFormContainer: (
      <ProjectCategoryFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
      />
    ),
    projectCreatorFiltersFormContainer: (
      <ProjectCreatorFiltersForm
        creatorCheckboxGroupItems={mockedUserSummaries}
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
