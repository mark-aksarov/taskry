import { mocked } from "storybook/test";
import AppTaskDetailLoading from "./loading";
import AppTaskDetailNotFound from "./not-found";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { TaskDetailAlt } from "@/dashboard/tasks/TaskDetailAlt";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailCardHeader } from "@/dashboard/tasks/TaskDetailCard";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { withCreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskTitleProvider } from "@/dashboard/tasks/UpdateTaskTitleProvider/__stories__";
import { withUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskProjectProvider } from "@/dashboard/tasks/UpdateTaskProjectProvider/__stories__";
import { withUpdateTaskDeadlineProvider } from "@/dashboard/tasks/UpdateTaskDeadlineProvider/__stories__";
import { withUpdateTaskAssigneeProvider } from "@/dashboard/tasks/UpdateTaskAssigneeProvider/__stories__";
import { withUpdateTaskStatusAltProvider } from "@/dashboard/tasks/UpdateTaskStatusAltProvider/__stories__";
import { withUpdateTaskDescriptionProvider } from "@/dashboard/tasks/UpdateTaskDescriptionProvider/__stories__";
import { withUpdateTaskCategoryRelProvider } from "@/dashboard/tasks/UpdateTaskCategoryRelProvider/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateTaskProjectProvider,
    withUpdateTaskCategoryRelProvider,
    withUpdateTaskAssigneeProvider,
    withUpdateTaskStatusAltProvider,
    withUpdateTaskDeadlineProvider,
    withUpdateTaskDescriptionProvider,
    withUpdateTaskTitleProvider,
    withUpdateTaskStatusProvider,
    withCreateSubtaskProvider,
    withDeleteTaskProvider,
    DashboardPageDecorator,
    withThemedBackground,
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
    taskDetailCardHeaderContainer: (
      <TaskDetailCardHeader
        taskStatus={mockedTaskDetail.status}
        taskDeadline={mockedTaskDetail.deadline}
      />
    ),
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        progress={75}
        subtasksList={<SubtaskListExample variant="rich" showActionMenu />}
      />
    ),
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
        deadline={mockedTaskDetail.deadline}
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
