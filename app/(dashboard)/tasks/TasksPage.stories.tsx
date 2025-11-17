import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksPage } from "./TasksPage";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { default as TaskPageLoading } from "./loading";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { Default as NewTaskFormStory } from "@/components/tasks/NewTaskForm/NewTaskForm.stories";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { Default as TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/TaskFiltersForm.stories";
import { withTaskDetail } from "@/components/tasks/TaskDetail/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsContainer/decorators";
import { withUpdateSubtasksForm } from "@/components/subtasks/UpdateSubtasksForm/decorators";

const meta = {
  title: "components/pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskDetail,
    withTaskComments,
    withUpdateSubtasksForm,
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
    TaskFiltersFormContainer: () => (
      <TaskFiltersForm {...TaskFiltersFormStory.args} />
    ),
    NewTaskFormContainer: () => <NewTaskForm {...NewTaskFormStory.args} />,
    TaskViewModeContainer: () => (
      <ViewModeContainer
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
      />
    ),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <TaskPageLoading />,
};

export const WithNoTasks: Story = {
  args: { ...Default.args },
  render: () => <TasksPageEmpty />,
};
