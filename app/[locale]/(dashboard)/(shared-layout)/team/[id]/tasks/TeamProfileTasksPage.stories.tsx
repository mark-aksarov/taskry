import {
  UserTasksPageLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { EditUserForm } from "@/components/users/EditUserForm";
import { ProfileActions } from "@/components/users/ProfileActions";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedUserDetail, mockedUserSummaries } from "@/mocks/users";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { UserTasksPresentation } from "@/components/users/UserTasksPresentation";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { MockedUpdateUserImageProvider } from "@/components/users/UpdateUserImageContext/__stories__";
import { withDeleteUserImageModalProvider } from "@/components/users/DeleteUserImageModal/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";
import { MockedClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlContext/__stories__";

const meta = {
  title: "pages/TeamProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    withDeleteUserImageModalProvider,
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
    userId: mockedUserDetail.id,
    totalTasksCount: 3,
    selectedSortField: "title",
    backButton: true,
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
      <MockedClearUserImageUrlProvider>
        <MockedUpdateUserImageProvider>
          <UserDetailHeaderInteractive
            userId={mockedUserDetail.id}
            fullName={mockedUserDetail.fullName}
            positionName={mockedUserDetail.position.name}
            imageUrl={mockedUserDetail.imageUrl}
          />
        </MockedUpdateUserImageProvider>
      </MockedClearUserImageUrlProvider>
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={
          <ProfileActions
            userId={mockedUserDetail.id}
            userFullName={mockedUserDetail.fullName}
          />
        }
      />
    ),
    editUserFormContainer: (
      <EditUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    newTaskFormContainer: (
      <NewTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
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
