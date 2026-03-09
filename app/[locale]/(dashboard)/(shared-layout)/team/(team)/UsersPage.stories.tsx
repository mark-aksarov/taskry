import { UsersPage } from "./UsersPage";
import UsersPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useParams } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { UserListStory } from "@/components/users/UserList/__stories__";
import { UserGridStory } from "@/components/users/UserGrid/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateUserProvider } from "@/components/users/CreateUserContext/__stories__";
import { withUserFiltersProvider } from "@/components/users/UserFiltersContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreatePositionProvider } from "@/components/position/CreatePositionContext/__stories__";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUserFiltersProvider,
    withCreateUserProvider,
    withCreatePositionProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withCurrentUserProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
    mocked(useParams).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalFilteredUsers: 3,
    selectedSortField: "fullName",
    filtersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
    usersContainer: (
      <EntityContainerPresentation
        list={<UserList {...UserListStory.args} />}
        grid={<UserGrid {...UserGridStory.args} />}
        page={1}
        pageSize={3}
        totalPages={3}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
} satisfies Story;
