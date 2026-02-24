import {
  UserTasksPageLayout,
  UserTasksPageEmptyLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { fn, mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TeamProfileTemplate from "../TeamProfileTemplate";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { profileActionsArgs } from "@/components/users/ProfileActions/__stories__";
import { withDeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteSubtaskModalProvider } from "@/components/subtasks/DeleteSubtaskModal/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext/__stories__";

const meta = {
  title: "pages/TeamProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TeamProfileTemplate {...AppHeaderStory.args}>
        <Story />
      </TeamProfileTemplate>
    ),
    withDeleteTaskModalProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withDeleteSubtaskModalProvider,
    withDeleteCommentModalProvider,
    withUpdateTaskStatusesProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/user-1/tasks`);
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    selectedSortField: "title",
    backButton: true,
    deleteTasks: () => ({ status: "success" }),
    userTasksContainer: <UserTaskList {...UserTaskListStory.args} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName="User 1"
        positionName="Position 1"
        imageUrl="/man.jpg"
      />
    ),
    navigationDesktop: (
      <UserNavigationDesktop
        userActions={<ProfileActions {...profileActionsArgs} />}
      />
    ),
    navigationMobile: <UserNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  render: () => (
    <UserTasksPageEmptyLayout
      {...Default.args}
      newTaskFormContainer={<NewTaskForm {...newTaskFormArgs} />}
    />
  ),
};
