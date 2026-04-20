import { mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { TaskCategoryGridExample } from "@/dashboard/taskCategory/TaskCategoryGrid/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withCreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryProvider/__stories__";
import { withDeleteTaskCategoriesProvider } from "@/dashboard/taskCategory/DeleteTaskCategoriesProvider/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateTaskCategoryProvider,
    withDeleteTaskCategoriesProvider,
    withSelectedItemsProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/task-categories");
  },
} satisfies Meta<typeof TaskCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    taskCategoriesContainer: <TaskCategoryGridExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
