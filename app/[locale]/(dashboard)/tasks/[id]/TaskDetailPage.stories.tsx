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
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { editTaskFormArgs } from "@/components/tasks/EditTaskForm/__stories__";
import { taskDetailAltArgs } from "@/components/tasks/TaskDetailAlt/__stories__";
import { withDeleteSubtaskModalProvider } from "@/components/subtasks/DeleteSubtaskModal/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    PageDecorator,
    withDeleteSubtaskModalProvider,
    withDeleteCommentModalProvider,
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
    guestMode: false,
    taskId: task.id,
    taskTitle: task.title,
    deleteTask: () => ({ status: "success" }),
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
    appHeaderProps: AppHeaderStory.args,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: <DetailHeaderSkeleton />,
    appHeaderProps: AppHeaderStory.args,
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
        createSubtask={() => ({ status: "success" })}
      />
    ),
    taskHeaderContainer: <TaskDetailHeader taskTitle={task.title} />,
    appHeaderProps: AppHeaderStory.args,
  },
} satisfies Story;
