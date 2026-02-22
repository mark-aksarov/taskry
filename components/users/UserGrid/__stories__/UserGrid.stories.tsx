import { UserGrid } from "../UserGrid";
import { UserGridItem } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedUsers } from "../../UserList/__stories__";
import { UserGridItemStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGrid",
  component: UserGrid,
  decorators: [
    withPageTransitionProvider,
    withDeleteUserModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUsers.map((user) => (
      <UserGridItem key={user.id} {...UserGridItemStory.args} {...user} />
    )),
  },
} satisfies Story;
