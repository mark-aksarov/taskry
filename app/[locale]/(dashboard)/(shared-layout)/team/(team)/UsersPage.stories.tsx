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
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { UserListStory } from "@/components/users/UserList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserGridLarge, UserGridMobile } from "@/components/users/UserGrid";
import { withUserSearchModal } from "@/components/users/UserSearchModal/__stories__";
import { withCreateUserProvider } from "@/components/users/CreateUserProvider/__stories__";
import { withUserFiltersProvider } from "@/components/users/UserFiltersContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withCreatePositionProvider } from "@/components/position/CreatePositionProvider/__stories__";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUserSearchModal,
    withUserFiltersProvider,
    withCreatePositionProvider,
    withCreateUserProvider,
    SharedPageDecorator,
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
    usersContainer: (
      <EntityContainerPresentation
        listLarge={() => <UserList {...UserListStory.args} />}
        gridLarge={() => <UserGridLarge {...UserGridLargeStory.args} />}
        gridMobile={() => <UserGridMobile {...UserGridMobileStory.args} />}
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
