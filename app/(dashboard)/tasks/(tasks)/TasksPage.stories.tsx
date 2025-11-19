import { TasksPage } from "./TasksPage";
import { mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { withTaskDetail } from "@/components/tasks/TaskDetailClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { withUpdateSubtasksForm } from "@/components/subtasks/UpdateSubtasksForm/decorators";
import { Default as NewTaskFormStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as NewProjectFormStory } from "@/components/projects/NewProjectForm/NewProjectForm.stories";
import { Default as TaskFiltersFormStory } from "@/components/tasks/TaskFiltersForm/TaskFiltersForm.stories";

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
    NewProjectFormContainer: () => (
      <NewProjectForm {...NewProjectFormStory.args} />
    ),
    TasksServerContainer: () => (
      <ViewModeLayout
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
      />
    ),
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
