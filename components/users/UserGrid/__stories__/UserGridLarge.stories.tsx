import { mockedUserList } from "@/mocks/users";
import { UserGridLarge } from "../UserGridLarge";
import { UserGridItemLarge } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemLargeStory } from "../../UserGridItem/__stories__";
import { MockedUserItemModals } from "../../UserItemModals/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedUserItemProviders } from "../../UserItemProviders/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGridLarge",
  component: UserGridLarge,
  decorators: [
    withGuestModeModalProvider,
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
      <MockedUserItemProviders key={user.id}>
        <UserGridItemLarge {...UserGridItemLargeStory.args} {...user} />
        <MockedUserItemModals />
      </MockedUserItemProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
