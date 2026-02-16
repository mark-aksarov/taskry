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
import { TaskGridStory } from "@/components/tasks/TaskGrid/__stories__";
import { TaskListStory } from "@/components/tasks/TaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewTaskFormStory } from "@/components/tasks/NewTaskForm/__stories__";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/__stories__";
import { withDeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";
import { NewTaskCategoryFormStory } from "@/components/taskCategory/NewTaskCategoryForm/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";
import { TaskToolbarActionsMenuTriggerStory } from "@/components/tasks/TaskToolbarActionsMenuTrigger/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withDeleteTaskModalProvider,
    withEntityPaginationProvider,
    withSelectedTasksProvider,
    withUpdateTaskStatusesProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const taskToolbarCreateNewMenuTrigger = (
  <TaskToolbarCreateNewMenuTrigger
    guestMode={false}
    newTaskFormContainer={<NewTaskForm {...NewTaskFormStory.args} />}
    newTaskCategoryForm={
      <NewTaskCategoryForm {...NewTaskCategoryFormStory.args} />
    }
  />
);

export const Default = {
  args: {
    tasksContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
        totalPages={3}
      />
    ),
    taskToolbarCreateNewMenuTrigger: taskToolbarCreateNewMenuTrigger,
    taskToolbarFiltersModalTrigger: (
      <TaskToolbarFiltersModalTrigger
        filtersFormContainer={
          <TaskFiltersForm {...TaskFiltersFormStory.args} />
        }
      />
    ),
    taskToolbarActionsMenuTrigger: (
      <TaskToolbarActionsMenuTrigger
        {...TaskToolbarActionsMenuTriggerStory.args}
      />
    ),
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
      taskToolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
    />
  ),
} satisfies Story;
