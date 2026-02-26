import { UserList } from "../UserList";
import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserListItemStory } from "../../UserListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserList",
  component: UserList,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withDeleteUserModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUserList.map((user) => (
      <UserListItem key={user.id} {...UserListItemStory.args} {...user} />
    )),
  },
} satisfies Story;
