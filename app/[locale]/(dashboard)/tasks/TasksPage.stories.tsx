import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/TaskFiltersForm.stories";

const meta = {
  title: "components/pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    canCreateTask: true,
    canDeleteTask: true,
    taskFiltersFormContainer: (
      <TaskFiltersForm {...TaskFiltersFormStory.args} />
    ),
    newTaskFormContainer: <NewTaskForm {...TaskFormBaseStory.args} />,
    tasksContainer: (
      <EntityContainerPresentation
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
        page={1}
        pageSize={3}
        totalPages={3}
      />
    ),
    deleteTasksAction: fn(),
    updateTasksStatusesAction: fn(),
    createTaskCategoryAction: fn(),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTasks = {
  args: { ...Default.args },
  render: () => (
    <TasksPageEmpty
      newTaskFormContainer={<NewTaskForm {...TaskFormBaseStory.args} />}
    />
  ),
} satisfies Story;
