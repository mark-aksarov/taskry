import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { ProjectCategoryGridExample } from "@/dashboard/projectCategory/ProjectCategoryGrid/__stories__";
import { withCreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoriesProvider } from "@/dashboard/projectCategory/DeleteProjectCategoriesProvider/__stories__";
import { withImportProjectCategoriesProvider } from "@/dashboard/projectCategory/ImportProjectCategoriesProvider/__stories__";

const meta = {
  title: "pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateProjectCategoryProvider,
    withDeleteProjectCategoriesProvider,
    withImportProjectCategoriesProvider,
    withSelectedItemsProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    projectCategoriesContainer: <ProjectCategoryGridExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjectCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
