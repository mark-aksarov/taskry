import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { mocked } from "storybook/test";
import { useParams, usePathname } from "next/navigation";
import { mockedUserSummaries } from "@/mocks/users";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { TaskGridStory } from "@/components/tasks/TaskGrid/__stories__";
import { TaskListStory } from "@/components/tasks/TaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withTaskFiltersProvider } from "@/components/tasks/TaskFiltersContext/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";
import { withCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryContext/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewSubtaskModal taskId={1} />
      </>
    ),
    withCreateSubtaskProvider,
    withCreateTaskCategoryProvider,
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withTaskFiltersProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    PageDecorator,
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
    filtersFormContainer: (
      <TaskFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
        projectCheckboxGroupItems={mockedProjectSummaries}
        assigneeCheckboxGroupItems={mockedUserSummaries}
      />
    ),
    newTaskFormContainer: (
      <NewTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
