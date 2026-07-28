import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { mocked } from "storybook/test";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { CreateTaskForm } from "@/dashboard/tasks/CreateTaskForm";
import { TaskFiltersForm } from "@/dashboard/tasks/TaskFiltersForm";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { TaskGridExample } from "@/dashboard/tasks/TaskGrid/__stories__";
import { AssigneeFiltersForm } from "@/dashboard/tasks/AssigneeFiltersForm";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { TaskProjectFiltersForm } from "@/dashboard/tasks/TaskProjectFiltersForm";
import { TaskCategoryFiltersForm } from "@/dashboard/tasks/TaskCategoryFiltersForm";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
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
    page: 1,
    pageSize: 1,
    totalCount: 10,
    categoryCount: 2,
    projectCount: 3,
    totalFilteredTasks: 3,
    selectedSortField: "title",
    selectedItems: [],
    filters: {},
    taskGrid: <TaskGridExample showCheckbox={true} />,
    searchContainer: <SearchListExample />,
    createTaskFormContainer: (
      <CreateTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
    taskFiltersFormContainer: (
      <TaskFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
        projectCheckboxGroupItems={mockedProjectSummaries}
        assigneeCheckboxGroupItems={mockedUserSummaries}
      />
    ),
    assigneeFiltersFormContainer: (
      <AssigneeFiltersForm assigneeCheckboxGroupItems={mockedUserSummaries} />
    ),
    taskProjectFiltersFormContainer: (
      <TaskProjectFiltersForm
        projectCheckboxGroupItems={mockedProjectSummaries}
      />
    ),
    taskCategoryFiltersFormContainer: (
      <TaskCategoryFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
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
