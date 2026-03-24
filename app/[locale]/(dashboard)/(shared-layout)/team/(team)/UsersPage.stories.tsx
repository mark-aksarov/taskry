import {
  UserGridLargeStory,
  UserGridMobileStory,
} from "@/components/users/UserGrid/__stories__";

import { UsersPage } from "./UsersPage";
import { mocked } from "storybook/test";
import UsersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { UserList } from "@/components/users/UserList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { UserListStory } from "@/components/users/UserList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserGridLarge, UserGridMobile } from "@/components/users/UserGrid";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { withCreateUserProvider } from "@/components/users/CreateUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withUserFiltersProvider } from "@/components/users/UserFiltersContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreatePositionProvider } from "@/components/position/CreatePositionContext/__stories__";
import { UserPositionFiltersForm } from "@/components/users/UserPositionFiltersForm";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUserFiltersProvider,
    withCreateUserProvider,
    withCreatePositionProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalFilteredUsers: 3,
    selectedSortField: "fullName",
    searchContainer: <SearchList {...SearchListStory.args} />,
    filtersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
    positionFiltersFormContainer: (
      <UserPositionFiltersForm
        positionCheckboxGroupItems={mockedPositionSummaries}
      />
    ),
    usersContainer: (
      <EntityContainerPresentation
        listLarge={<UserList {...UserListStory.args} />}
        gridLarge={<UserGridLarge {...UserGridLargeStory.args} />}
        gridMobile={<UserGridMobile {...UserGridMobileStory.args} />}
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

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredUsers: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
