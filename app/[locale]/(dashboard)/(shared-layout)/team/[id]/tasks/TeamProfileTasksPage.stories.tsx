import { mocked } from "storybook/test";
import { mockedTaskList } from "@/mocks/tasks";
import { mockedUserDetail } from "@/mocks/users";
import AppProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { TaskGridItemMobile } from "@/dashboard/tasks/TaskGridItem";
import { UserTaskListItem } from "@/dashboard/users/UserTaskListItem";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { UserTasksPageLayout } from "@/dashboard/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { UserTasksPresentation } from "@/dashboard/users/UserTasksPresentation";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withUpdateUserProvider } from "@/dashboard/users/UpdateUserProvider/__stories__";
import { withDeleteUserProvider } from "@/dashboard/users/DeleteUserProvider/__stories__";
import { MockedDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext/__stories__";

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
                <UserTaskListItem {...task} />
                <TaskGridItemMobile
                  {...task}
                  subtasksTotal={task.subtasks.total}
                  subtasksDone={task.subtasks.done}
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
