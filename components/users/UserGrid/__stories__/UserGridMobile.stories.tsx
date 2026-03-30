import { mockedUserList } from "@/mocks/users";
import { UserGridMobile } from "../UserGridMobile";
import { UserGridItemMobile } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemMobileStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedUserItemWrapper } from "../../UserItemWrapper/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGridMobile",
  component: UserGridMobile,
  decorators: [
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof UserGridMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUserList.map((user) => (
      <MockedUserItemWrapper key={user.id}>
        <UserGridItemMobile {...UserGridItemMobileStory.args} {...user} />
      </MockedUserItemWrapper>
    )),
  },
} satisfies Story;
