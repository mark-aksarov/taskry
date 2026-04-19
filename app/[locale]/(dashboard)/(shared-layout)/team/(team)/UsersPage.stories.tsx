import {
  UserGridItemLarge,
  UserGridItemMobile,
} from "@/components/users/UserGridItem";

import {
  UserGridItemLargeStory,
  UserGridItemMobileStory,
} from "@/components/users/UserGridItem/__stories__";

import { UsersPage } from "./UsersPage";
import { mocked } from "storybook/test";
import UsersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { mockedUserList } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserListItem } from "@/components/users/UserListItem";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserListItemStory } from "@/components/users/UserListItem/__stories__";
import { withUserSearchModal } from "@/components/users/UserSearchModal/__stories__";
import { withCreateUserProvider } from "@/components/users/CreateUserProvider/__stories__";
import { withUserFiltersProvider } from "@/components/users/UserFiltersContext/__stories__";
import { MockedDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { MockedUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
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
      <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
        {mockedUserList.map((user) => (
          <MockedDeleteUserProvider>
            <MockedUpdateUserProvider>
              <UserListItem {...UserListItemStory.args} {...user} />
              <UserGridItemMobile {...UserGridItemMobileStory.args} {...user} />
              <UserGridItemLarge {...UserGridItemLargeStory.args} {...user} />
            </MockedUpdateUserProvider>
          </MockedDeleteUserProvider>
        ))}
      </EntityContainerPresentation>
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
