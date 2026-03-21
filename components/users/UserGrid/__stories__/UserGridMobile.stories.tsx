import { mockedUserList } from "@/mocks/users";
import { UserGridMobile } from "../UserGridMobile";
import { UserGridItemMobile } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemMobileStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGridMobile",
  component: UserGridMobile,
  decorators: [
    withGuestModeModalProvider,
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
      <UserGridItemMobile
        key={user.id}
        {...UserGridItemMobileStory.args}
        {...user}
      />
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
