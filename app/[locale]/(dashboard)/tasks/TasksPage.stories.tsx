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
import { TaskFormBase } from "@/components/tasks/TaskFormBase";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewTaskCategoryForm } from "@/components/tasks/NewTaskCategoryForm";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";
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
    tasksContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
        totalPages={3}
      />
    ),
    taskToolbarCreateNewMenuTrigger: (
      <TaskToolbarCreateNewMenuTrigger
        newTaskFormContainer={<TaskFormBase {...TaskFormBaseStory.args} />}
        newTaskCategoryForm={<NewTaskCategoryForm formAction={fn()} />}
      />
    ),
    taskToolbarFiltersModalTrigger: (
      <TaskToolbarFiltersModalTrigger
        filtersFormContainer={
          <TaskFiltersForm {...TaskFiltersFormStory.args} />
        }
      />
    ),
    taskToolbarActionsMenuTrigger: (
      <TaskToolbarActionsMenuTrigger
        deleteAction={fn()}
        updateStatusAction={fn()}
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
      newTaskFormContainer={<NewTaskForm {...TaskFormBaseStory.args} />}
    />
  ),
} satisfies Story;
