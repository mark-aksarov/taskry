import { UserList } from "../UserList";
import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserListItemStory } from "../../UserListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedUserItemWrapper } from "../../UserItemWrapper/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserList",
  component: UserList,
  decorators: [
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
      <MockedUserItemWrapper key={user.id}>
        <UserListItem {...UserListItemStory.args} {...user} />
      </MockedUserItemWrapper>
    )),
  },
} satisfies Story;
