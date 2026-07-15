import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import AppProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { UserTaskListExample } from "@/dashboard/users/UserTaskList/__stories__";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withUpdateUserProvider } from "@/dashboard/users/UpdateUserProvider/__stories__";
import { withDeleteUserProvider } from "@/dashboard/users/DeleteUserProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withResetPasswordProvider } from "@/dashboard/users/ResetPasswordProvider/__stories__";
import { withChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext/__stories__";

const meta = {
  title: "pages/TeamProfileTasksPage",
  component: TeamProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
    withResetPasswordProvider,
    withChangePasswordProvider,
    withUpdateUserProvider,
    withDeleteUserProvider,
    withUpdateUserImageProvider,
    withClearUserImageUrlProvider,
    withUpdateUserImageFileProvider,
    withViewModeProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/user-1/tasks`);
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof TeamProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 1,
    totalTasksCount: 3,
    selectedSortField: "title",
    backButton: true,
    userTaskList: <UserTaskListExample />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={<ProfileActions userId={mockedUserDetail.id} />}
      />
    ),
    navigationMobile: <UserNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <AppProfileTasksPageLoading />,
};

export const WithNoTasks = {
  ...Default,
  args: { ...Default.args, totalTasksCount: 0 },
} satisfies Story;
