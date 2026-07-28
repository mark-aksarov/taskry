import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { ProjectCategoryGridExample } from "@/dashboard/projectCategory/ProjectCategoryGrid/__stories__";

const meta = {
  title: "pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    selectedItems: [{ id: 1 }, { id: 2 }, { id: 3 }],
    projectCategoriesContainer: <ProjectCategoryGridExample />,
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjectCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
