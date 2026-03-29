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
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { UpdateUserForm } from "@/components/users/UpdateUserForm";
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
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { MockedUserDetailHeaderProviders } from "@/components/users/UserDetailHeader/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordProvider/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";

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
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    SharedPageDecorator,
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
      <UserNavigationLarge
        userActions={
          <ProfileActions
            userId={mockedUserDetail.id}
            userFullName={mockedUserDetail.fullName}
          />
        }
      />
    ),
    updateUserFormContainer: (
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
