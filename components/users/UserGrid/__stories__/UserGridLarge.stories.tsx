import { mockedUserList } from "@/mocks/users";
import { UserGridLarge } from "../UserGridLarge";
import { UserGridItemLarge } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItemLargeStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedUserItemWrapper } from "../../UserItemWrapper/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGridLarge",
  component: UserGridLarge,
  decorators: [
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserGridLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUserList.map((user) => (
      <MockedUserItemWrapper key={user.id}>
        <UserGridItemLarge {...UserGridItemLargeStory.args} {...user} />
      </MockedUserItemWrapper>
    )),
  },
} satisfies Story;
