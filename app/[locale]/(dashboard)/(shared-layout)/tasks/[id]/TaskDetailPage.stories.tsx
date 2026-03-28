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
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { SearchList } from "@/components/search/SearchList";
import { UpdateTaskForm } from "@/components/tasks/UpdateTaskForm";
import { CommentList } from "@/components/comments/CommentList";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskDetailHeader } from "@/components/tasks/TaskDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { withDeleteTaskProvider } from "@/components/tasks/DeleteTaskContext/__stories__";
import { withUpdateTaskProvider } from "@/components/tasks/UpdateTaskContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <CreateSubtaskModal taskId={1} />
      </>
    ),
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withCreateSubtaskProvider,
    withCurrentUserProvider,
    SharedPageDecorator,
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
    searchContainer: <SearchList {...SearchListStory.args} />,
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
    updateTaskFormContainer: (
      <UpdateTaskForm
        {...mockedTaskDetail}
        taskId={mockedTaskDetail.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
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
