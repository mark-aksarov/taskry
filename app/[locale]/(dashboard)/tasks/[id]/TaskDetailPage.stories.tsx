import { mocked } from "storybook/test";
import AppTaskDetailLoading from "./loading";
import AppTaskDetailNotFound from "./not-found";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskDetailAlt } from "@/dashboard/tasks/TaskDetailAlt";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { TaskDetailCardHeader } from "@/dashboard/tasks/TaskDetailCard";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { UpdateTaskProjectForm } from "@/dashboard/tasks/UpdateTaskProjectForm";
import { UpdateTaskAssigneeForm } from "@/dashboard/tasks/UpdateTaskAssigneeForm";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { UpdateTaskCategoryRelForm } from "@/dashboard/tasks/UpdateTaskCategoryRelForm";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <DeadlineProvider deadline={new Date().toString()}>
        <Story />
      </DeadlineProvider>
    ),
    withDashboardLayout,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(useParams).mockReturnValue({
      id: mockedTaskDetail.id.toString(),
    });
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    task: mockedTaskDetail,
    taskDetailCardHeaderContainer: (
      <TaskDetailCardHeader taskStatus={mockedTaskDetail.status} />
    ),
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        progress={75}
        subtasksList={<SubtaskListExample variant="rich" showActionMenu />}
      />
    ),
    updateTaskCategoryRelFormContainer: (
      <UpdateTaskCategoryRelForm
        taskId={mockedTaskDetail.id}
        categoryId={mockedTaskDetail.category.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
      />
    ),
    updateTaskProjectFormContainer: (
      <UpdateTaskProjectForm
        taskId={mockedTaskDetail.id}
        projectId={mockedTaskDetail.project.id}
        projectSelectItems={mockedProjectSummaries}
      />
    ),
    updateTaskAssigneeFormContainer: (
      <UpdateTaskAssigneeForm
        taskId={mockedTaskDetail.id}
        assigneeId={mockedTaskDetail.assignee.id}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppTaskDetailLoading />,
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        title={mockedTaskDetail.title}
        status={mockedTaskDetail.status}
        progress={75}
      />
    ),
  },
} satisfies Story;

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppTaskDetailNotFound />,
} satisfies Story;
