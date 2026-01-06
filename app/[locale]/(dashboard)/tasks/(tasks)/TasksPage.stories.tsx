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
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "components/pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    canCreateTask: true,
    canDeleteTask: true,
    taskFiltersFormContainer: (
      <TaskFiltersForm {...TaskFiltersFormStory.args} />
    ),
    newTaskFormContainer: <NewTaskForm {...TaskFormBaseStory.args} />,
    tasksContainer: (
      <ViewModeLayout
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
      />
    ),
    deleteTasksAction: fn(),
    updateTasksStatusesAction: fn(),
    createTaskCategoryAction: fn(),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
};

export const WithNoTasks: Story = {
  args: { ...Default.args },
  render: () => (
    <TasksPageEmpty
      newTaskFormContainer={<NewTaskForm {...TaskFormBaseStory.args} />}
    />
  ),
};
