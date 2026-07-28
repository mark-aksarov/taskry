import { mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { TaskCategoryGridExample } from "@/dashboard/taskCategory/TaskCategoryGrid/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/task-categories");
  },
} satisfies Meta<typeof TaskCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    selectedItems: [{ id: 1 }, { id: 2 }, { id: 3 }],
    taskCategoriesContainer: <TaskCategoryGridExample />,
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
