import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withTaskFiltersProvider } from "@/dashboard/tasks/TaskFiltersContext/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { TasksContainerPresentationExample } from "@/dashboard/tasks/TasksContainer/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";
import { withCreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryProvider/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withTaskFiltersProvider,
    withCreateTaskCategoryProvider,
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 3,
    categoryCount: 2,
    projectCount: 3,
    totalFilteredTasks: 3,
    selectedSortField: "title",
    tasksContainer: <TasksContainerPresentationExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTasks = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredTasks: 0 },
} satisfies Story;
