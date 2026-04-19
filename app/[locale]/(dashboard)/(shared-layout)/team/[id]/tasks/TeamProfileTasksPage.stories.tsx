import { mocked } from "storybook/test";
import { mockedTaskList } from "@/mocks/tasks";
import { mockedUserDetail } from "@/mocks/users";
import AppProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { ProfileActions } from "@/components/users/ProfileActions";
import { TaskGridItemMobile } from "@/components/tasks/TaskGridItem";
import { UserTaskListItem } from "@/components/users/UserTaskListItem";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { UserTasksPresentation } from "@/components/users/UserTasksPresentation";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { TaskGridItemMobileStory } from "@/components/tasks/TaskGridItem/__stories__";
import { UserTaskListItemStory } from "@/components/users/UserTaskListItem/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { MockedDeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext/__stories__";

const meta = {
  title: "pages/TeamProfileTasksPage",
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
    mocked(usePathname).mockReturnValue(`/team/user-1/tasks`);
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalTasksCount: 3,
    selectedSortField: "title",
    backButton: true,
    userTasksContainer: (
      <UserTasksPresentation page={1} pageSize={10} totalPages={3}>
        {mockedTaskList.map((task) => (
          <MockedDeleteTaskProvider key={task.id}>
            <MockedUpdateTaskProvider>
              <MockedUpdateTaskStatusProvider>
                <UserTaskListItem {...UserTaskListItemStory.args} {...task} />
                <TaskGridItemMobile
                  {...TaskGridItemMobileStory.args}
                  {...task}
                />
              </MockedUpdateTaskStatusProvider>
            </MockedUpdateTaskProvider>
          </MockedDeleteTaskProvider>
        ))}
      </UserTasksPresentation>
    ),
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
