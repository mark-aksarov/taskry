import {
  TaskDetailAlt,
  TaskDetailAltSkeleton,
} from "@/components/tasks/TaskDetailAlt";

import { mocked } from "storybook/test";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { TaskDetailHeader } from "@/components/tasks/TaskDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { editTaskFormArgs } from "@/components/tasks/EditTaskForm/__stories__";
import { taskDetailAltArgs } from "@/components/tasks/TaskDetailAlt/__stories__";
import { withDeleteTaskProvider } from "@/components/tasks/DeleteTaskContext/__stories__";
import { withUpdateTaskProvider } from "@/components/tasks/UpdateTaskContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewSubtaskModal taskId={1} />
      </>
    ),
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withCreateSubtaskProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskDetail;

export const Default = {
  args: {
    taskId: task.id,
    taskTitle: task.title,
    updateComment: () => ({ status: "success" }),
    sendComment: () => ({ status: "success" }),
    taskCommentsContainer: getCommentList(),
    taskDetailContainer: <TaskDetailAlt {...taskDetailAltArgs} />,
    taskHeaderContainer: (
      <TaskDetailHeader
        taskTitle={task.title}
        categoryName={task.category?.name}
      />
    ),
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        id={task.id}
        project={task.project}
        deadline={task.deadline}
        status={task.status}
      />
    ),
    taskHeaderContainer: <TaskDetailHeader taskTitle={task.title} />,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
