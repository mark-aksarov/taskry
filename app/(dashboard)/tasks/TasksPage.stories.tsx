import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksPage } from "./TasksPage";
import { TaskCategoryCheckboxGroup } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { withBackgroundVariant } from "@/.storybook/decorators";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { default as TaskPageLoading } from "./loading";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TaskCategorySelect } from "@/components/tasks/TaskCategorySelect/TaskCategorySelect";
import { UserSelect } from "@/components/users/UserSelect";
import { ProjectSelect } from "@/components/projects/ProjectSelect";

import { Default as TaskCategorySelectStory } from "@/components/tasks/TaskCategorySelect/TaskCategorySelect.stories";
import { Default as ProjectCheckboxGroupStory } from "@/components/projects/ProjectCheckboxGroup/ProjectCheckboxGroup.stories";
import { Default as ProjectSelectStory } from "@/components/projects/ProjectSelect/ProjectSelect.stories";
import { Default as UserSelectStory } from "@/components/users/UserSelect/UserSelect.stories";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as TaskGridStory } from "@/components/tasks/TaskGrid/TaskGrid.stories";
import { Default as TaskCategoryCheckboxGroupStory } from "@/components/tasks/TaskCategoryCheckboxGroup/TaskCategoryCheckboxGroup.stories";
import { Default as UserCheckboxGroupStory } from "@/components/users/UserCheckboxGroup/UserCheckboxGroup.stories";

const meta = {
  title: "components/pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withBackgroundVariant()],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    TaskCategoryCheckboxGroupContainer: () => (
      <TaskCategoryCheckboxGroup {...TaskCategoryCheckboxGroupStory.args} />
    ),
    ProjectCheckboxGroupContainer: () => (
      <ProjectCheckboxGroup {...ProjectCheckboxGroupStory.args} />
    ),
    UserCheckboxGroupContainer: () => (
      <UserCheckboxGroup {...UserCheckboxGroupStory.args} />
    ),
    TaskCategorySelectContainer: () => (
      <TaskCategorySelect {...TaskCategorySelectStory.args} />
    ),
    UserSelectContainer: () => <UserSelect {...UserSelectStory.args} />,
    ProjectSelectContainer: () => (
      <ProjectSelect {...ProjectSelectStory.args} />
    ),
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
