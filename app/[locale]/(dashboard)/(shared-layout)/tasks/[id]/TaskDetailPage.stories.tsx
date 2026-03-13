import {
  TaskDetailAlt,
  TaskDetailAltSkeleton,
} from "@/components/tasks/TaskDetailAlt";

import { mocked } from "storybook/test";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { CommentList } from "@/components/comments/CommentList";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskDetailHeader } from "@/components/tasks/TaskDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
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
      id: mockedTaskDetail.id.toString(),
    });
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskTitle: mockedTaskDetail.title,
    updateComment: () => ({ status: "success" }),
    sendComment: () => ({ status: "success" }),
    taskCommentsContainer: <CommentList {...CommentListStory.args} />,
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
      />
    ),
    taskHeaderContainer: (
      <TaskDetailHeader
        taskTitle={mockedTaskDetail.title}
        categoryName={mockedTaskDetail.category?.name}
      />
    ),
    editTaskFormContainer: (
      <EditTaskForm
        {...mockedTaskDetail}
        taskId={mockedTaskDetail.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
        taskProjectSelectItems={mockedProjectSummaries}
        taskAssigneeSelectItems={mockedUserSummaries}
      />
    ),
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
        id={mockedTaskDetail.id}
        project={mockedTaskDetail.project}
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
      />
    ),
    taskHeaderContainer: (
      <TaskDetailHeader taskTitle={mockedTaskDetail.title} />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
