import {
  UserTasksPageLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { UserTaskList } from "@/components/users/UserTaskList";
import { UpdateUserForm } from "@/components/users/UpdateUserForm";
import { ProfileActions } from "@/components/users/ProfileActions";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedUserDetail, mockedUserSummaries } from "@/mocks/users";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { UserTasksPresentation } from "@/components/users/UserTasksPresentation";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { MockedUserDetailHeaderProviders } from "@/components/users/UserDetailHeader/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";

const meta = {
  title: "pages/ProfileTasksPage",
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
    userId: mockedUserDetail.id,
    totalTasksCount: 10,
    selectedSortField: "title",
    searchContainer: <SearchList {...SearchListStory.args} />,
    userTasksContainer: (
      <UserTasksPresentation
        page={1}
        pageSize={10}
        totalPages={3}
        listLarge={<UserTaskList {...UserTaskListStory.args} />}
        gridMobile={<TaskGridMobile {...TaskGridMobileStory.args} />}
      />
    ),
    userDetailHeaderContainer: (
      <MockedUserDetailHeaderProviders>
        <UserDetailHeaderInteractive
          userId={mockedUserDetail.id}
          fullName={mockedUserDetail.fullName}
          positionName={mockedUserDetail.position.name}
          imageUrl={mockedUserDetail.imageUrl}
        />
      </MockedUserDetailHeaderProviders>
    ),
    navigationLarge: (
      <ProfileNavigationLarge
        profileActions={
          <ProfileActions
            userId={mockedUserDetail.id}
            userFullName={mockedUserDetail.fullName}
          />
        }
      />
    ),
    navigationMobile: <ProfileNavigationMobile />,
    editUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    createTaskFormContainer: (
      <CreateTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  args: { ...Default.args, totalTasksCount: 0 },
};

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
