import { UserGrid } from "../UserGrid";
import { mockedUserList } from "@/mocks/users";
import { UserGridItem } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserGrid",
  component: UserGrid,
  decorators: [
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
      <UserGridItem key={user.id} {...UserGridItemStory.args} {...user} />
    )),
  },
} satisfies Story;
