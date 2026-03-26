import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { mocked } from "storybook/test";
import { mockedUserSummaries } from "@/mocks/users";
import { TaskList } from "@/components/tasks/TaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskGridLarge } from "@/components/tasks/TaskGrid";
import { SearchList } from "@/components/search/SearchList";
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { TaskListStory } from "@/components/tasks/TaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AssigneeFiltersForm } from "@/components/tasks/AssigneeFiltersForm";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { TaskGridLargeStory } from "@/components/tasks/TaskGrid/__stories__";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { TaskProjectFiltersForm } from "@/components/tasks/TaskProjectFiltersForm";
import { TaskCategoryFiltersForm } from "@/components/tasks/TaskCategoryFiltersForm";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withTaskFiltersProvider } from "@/components/tasks/TaskFiltersContext/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withCreateSubtaskModalProvider } from "@/components/subtasks/CreateSubtaskModal/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";
import { withCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider/__stories__";
import { withCreateTaskCategoryModalProvider } from "@/components/taskCategory/CreateTaskCategoryModal/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateSubtaskProvider,
    withCreateSubtaskModalProvider,
    withCreateTaskCategoryProvider,
    withCreateTaskCategoryModalProvider,
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withTaskFiltersProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    SharedPageDecorator,
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
        listLarge={<TaskList {...TaskListStory.args} />}
        gridLarge={<TaskGridLarge {...TaskGridLargeStory.args} />}
        gridMobile={<TaskGridMobile {...TaskGridMobileStory.args} />}
        totalPages={3}
      />
    ),
    searchContainer: <SearchList {...SearchListStory.args} />,
    filtersFormContainer: (
      <TaskFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
        projectCheckboxGroupItems={mockedProjectSummaries}
        assigneeCheckboxGroupItems={mockedUserSummaries}
      />
    ),
    taskCategoryFiltersFormContainer: (
      <TaskCategoryFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
      />
    ),
    projectFiltersFormContainer: (
      <TaskProjectFiltersForm
        projectCheckboxGroupItems={mockedProjectSummaries}
      />
    ),
    assigneeFiltersFormContainer: (
      <AssigneeFiltersForm assigneeCheckboxGroupItems={mockedUserSummaries} />
    ),
    createTaskFormContainer: (
      <CreateTaskForm
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
