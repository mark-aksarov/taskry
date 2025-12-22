import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { Default as NewTaskFormStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { Default as TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/TaskFiltersForm.stories";
import { withProjectDetailCompact } from "@/components/projects/ProjectDetailCompactClientContainer/decorators";

const meta = {
  title: "components/pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskDetailCompact,
    withProjectDetailCompact,
    withUserDetail,
    withTaskComments,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
    pageSize: 20,
    sort: "title",
    TaskFiltersFormContainer: () => (
      <TaskFiltersForm {...TaskFiltersFormStory.args} />
    ),
    NewTaskFormContainer: () => <NewTaskForm {...NewTaskFormStory.args} />,
    TasksServerContainer: () => (
      <ViewModeLayout
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
      />
    ),
    deleteTasksAction: fn(),
    updateTasksStatusesAction: fn(),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
};

export const WithNoTasks: Story = {
  args: { ...Default.args },
  render: () => <TasksPageEmpty />,
};
