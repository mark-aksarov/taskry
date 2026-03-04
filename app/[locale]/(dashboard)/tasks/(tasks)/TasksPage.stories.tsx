import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import TasksTemplate from "./TasksTemplate";
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
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { taskFiltersFormArgs } from "@/components/tasks/TaskFiltersForm/__stories__";
import { withTaskFiltersProvider } from "@/components/tasks/TaskFiltersContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TasksTemplate {...AppHeaderStory.args}>
        <Story />
      </TasksTemplate>
    ),
    withTaskFiltersProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
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

export const Default = {
  args: {
    totalCount: 3,
    totalFilteredTasks: 3,
    selectedSortField: "title",
    tasksContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<TaskList {...TaskListStory.args} />}
        grid={<TaskGrid {...TaskGridStory.args} />}
        totalPages={3}
      />
    ),
    filtersFormContainer: <TaskFiltersForm {...taskFiltersFormArgs} />,
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTasks = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
