import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { ProjectGridExample } from "@/dashboard/projects/ProjectGrid/__stories__";
import { withProjectSearchModal } from "@/dashboard/projects/ProjectSearchModal/__stories__";
import { withCreateProjectProvider } from "@/dashboard/projects/CreateProjectProvider/__stories__";
import { withProjectFiltersProvider } from "@/dashboard/projects/ProjectFiltersContext/__stories__";
import { withDeleteProjectsProvider } from "@/dashboard/projects/DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "@/dashboard/projects/SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "@/dashboard/projects/UpdateProjectStatusesProvider/__stories__";
import { withCreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryProvider/__stories__";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withProjectSearchModal,
    withProjectFiltersProvider,
    withCreateProjectCategoryProvider,
    withCreateProjectProvider,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withSelectedProjectsProvider,
    DashboardPageDecorator,
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
    page: 1,
    pageSize: 1,
    totalCount: 10,
    categoryCount: 2,
    customerCount: 3,
    totalFilteredProjects: 3,
    selectedSortField: "createdAt",
    projectGrid: <ProjectGridExample />,
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
