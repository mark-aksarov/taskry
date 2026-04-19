import { mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryGrid } from "@/components/taskCategory/TaskCategoryGrid";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { TaskCategoryGridStory } from "@/components/taskCategory/TaskCategoryGrid/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider/__stories__";
import { withDeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesProvider/__stories__";

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
    taskCategoriesContainer: (
      <TaskCategoryGrid {...TaskCategoryGridStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
