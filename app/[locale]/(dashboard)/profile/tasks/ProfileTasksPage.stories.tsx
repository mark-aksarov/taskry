import {
  UserTasksPageLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { mocked } from "storybook/test";
import ProfileTemplate from "../ProfileTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { EditUserForm } from "@/components/users/EditUserForm";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { editUserFormArgs } from "@/components/users/EditUserForm/__stories__";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/ProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <ProfileTemplate {...AppHeaderStory.args}>
        <Story />
      </ProfileTemplate>
    ),
    withPageTransitionProvider,
    withSelectedTasksProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    totalTasksCount: 10,
    selectedSortField: "title",
    userTasksContainer: <UserTaskList {...UserTaskListStory.args} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName="User 1"
        positionName="Position 1"
        imageUrl="/man.jpg"
      />
    ),
    navigationDesktop: (
      <ProfileNavigationDesktop userId="user-1" userFullName="User 1" />
    ),
    navigationMobile: <ProfileNavigationMobile />,
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
    deleteTasks: () => ({ status: "success" }),
    updateTaskStatuses: () => ({ status: "success" }),
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  args: { ...Default.args, totalTasksCount: 0 },
};
