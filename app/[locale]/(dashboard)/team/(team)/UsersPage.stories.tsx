import { UsersPage } from "./UsersPage";
import UsersPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import UsersTemplate from "./UsersTemplate";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserListStory } from "@/components/users/UserList/__stories__";
import { UserGridStory } from "@/components/users/UserGrid/__stories__";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { withDeleteUserModalProvider } from "@/components/users/DeleteUserModal/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <UsersTemplate {...AppHeaderStory.args}>
        <Story />
      </UsersTemplate>
    ),
    withDeleteUserModalProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalFilteredUsers: 3,
    selectedSortField: "fullName",
    guestMode: false,
    showCreateNewUserMenuItem: true,
    filtersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
    usersContainer: (
      <EntityContainerPresentation
        list={<UserList {...UserListStory.args} showCheckbox />}
        grid={<UserGrid {...UserGridStory.args} />}
        page={1}
        pageSize={3}
        totalPages={3}
      />
    ),
    createUser: () => ({ status: "success" }),
    createPosition: () => ({ status: "success" }),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
} satisfies Story;

export const WithNoUsers = {
  args: { ...Default.args },
  render: () => (
    <UsersPageEmpty
      guestMode={false}
      createUser={() => ({ status: "success" })}
      createPosition={() => ({ status: "success" })}
      showCreateNewUserMenuItem={true}
    />
  ),
} satisfies Story;
