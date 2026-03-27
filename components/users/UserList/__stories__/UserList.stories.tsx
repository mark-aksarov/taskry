import { UserList } from "../UserList";
import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserListItemStory } from "../../UserListItem/__stories__";
import { UserItemProviders } from "../../UserItem/UserItemProviders";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserList",
  component: UserList,
  decorators: [
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUserList.map((user) => (
      <UserItemProviders>
        <UserListItem key={user.id} {...UserListItemStory.args} {...user} />
      </UserItemProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
