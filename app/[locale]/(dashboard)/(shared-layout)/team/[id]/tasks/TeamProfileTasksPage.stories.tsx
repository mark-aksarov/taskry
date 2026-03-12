import {
  UserTasksPageLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { EditUserForm } from "@/components/users/EditUserForm";
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { editUserFormArgs } from "@/components/users/EditUserForm/__stories__";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";

const meta = {
  title: "pages/TeamProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateTaskProvider,
    withUpdateUserProvider,
    withChangePasswordProvider,
    withDeleteUserProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
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
    userId: "user-1",
    totalTasksCount: 3,
    selectedSortField: "title",
    backButton: true,
    userTasksContainer: <UserTaskList {...UserTaskListStory.args} />,
    userHeaderContainer: (
      <UserDetailHeader
        userId="user-1"
        fullName="User 1"
        positionName="Position 1"
        imageUrl="/man.jpg"
      />
    ),
    navigationDesktop: (
      <UserNavigationDesktop
        userActions={<ProfileActions userId="user-1" userFullName="User 1" />}
      />
    ),
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
    navigationMobile: <UserNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  ...Default,
  args: { ...Default.args, totalTasksCount: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
