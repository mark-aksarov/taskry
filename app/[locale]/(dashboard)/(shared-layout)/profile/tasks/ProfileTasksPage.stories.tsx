import {
  UserTasksPageLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { UserTaskList } from "@/components/users/UserTaskList";
import { ProfileActions } from "@/components/users/ProfileActions";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { UserTasksPresentation } from "@/components/users/UserTasksPresentation";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { withDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext/__stories__";

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
    userTasksContainer: (
      <UserTasksPresentation
        page={1}
        pageSize={10}
        totalPages={3}
        listLarge={() => <UserTaskList {...UserTaskListStory.args} />}
        gridMobile={() => <TaskGridMobile {...TaskGridMobileStory.args} />}
      />
    ),
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
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  args: { ...Default.args, totalTasksCount: 0 },
};
