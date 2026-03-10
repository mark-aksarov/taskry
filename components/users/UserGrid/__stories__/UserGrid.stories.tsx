import { UserGrid } from "../UserGrid";
import { mockedUserList } from "@/mocks/users";
import { UserGridItem } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemStory } from "../../UserGridItem/__stories__";
import { UserItemProviders } from "../../UserItem/UserItemProviders";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGrid",
  component: UserGrid,
  decorators: [
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUserList.map((user) => (
      <UserItemProviders
        updateUser={() => ({ status: "success" })}
        deleteUser={() => ({ status: "success" })}
      >
        <UserGridItem key={user.id} {...UserGridItemStory.args} {...user} />
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
