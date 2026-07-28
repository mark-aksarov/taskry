import { mocked } from "storybook/test";
import AppProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedPositionSummaries } from "@/mocks/positions";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { CreateTaskForm } from "@/dashboard/tasks/CreateTaskForm";
import { UpdateUserForm } from "@/dashboard/users/UpdateUserForm";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedUserDetail, mockedUserSummaries } from "@/mocks/users";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { UserTaskListExample } from "@/dashboard/users/UserTaskList/__stories__";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";

const meta = {
  title: "pages/TeamProfileTasksPage",
  component: TeamProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/user-1/tasks`);
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof TeamProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: mockedUserDetail,
    page: 1,
    pageSize: 1,
    totalTasksCount: 3,
    selectedSortField: "title",
    backButton: true,
    selectedItems: [],
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
    searchContainer: <SearchListExample />,
    createTaskFormContainer: (
      <CreateTaskForm
        forcedAssigneeId={mockedUserDetail.id}
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),

    updateUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  render: () => <AppProfileTasksPageLoading />,
};

export const WithNoTasks = {
  ...Default,
  args: { ...Default.args, totalTasksCount: 0 },
} satisfies Story;
