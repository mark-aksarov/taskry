import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import AppProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTasksPageLayout } from "@/dashboard/users/UserTasksPageLayout";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";
import { ProfileNavigationLarge } from "@/dashboard/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/dashboard/users/ProfileNavigationMobile";
import { withDeleteUserProvider } from "@/dashboard/users/DeleteUserProvider/__stories__";
import { withUpdateUserProvider } from "@/dashboard/users/UpdateUserProvider/__stories__";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider/__stories__";
import { UserTasksPresentationExample } from "@/dashboard/users/UserTasksPresentation/__stories__";
import { withUpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext/__stories__";

const meta = {
  title: "pages/ProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
    withChangePasswordProvider,
    withUpdateUserProvider,
    withDeleteUserProvider,
    withUpdateUserImageProvider,
    withClearUserImageUrlProvider,
    withUpdateUserImageFileProvider,
    withViewModeProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useParams).mockReturnValue({ id: mockedUserDetail.id });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalTasksCount: 10,
    selectedSortField: "title",
    userTasksContainer: <UserTasksPresentationExample />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    navigationLarge: (
      <ProfileNavigationLarge
        profileActions={<ProfileActions userId={mockedUserDetail.id} />}
      />
    ),
    navigationMobile: <ProfileNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <AppProfileTasksPageLoading />,
};

export const WithNoTasks = {
  args: { ...Default.args, totalTasksCount: 0 },
};
