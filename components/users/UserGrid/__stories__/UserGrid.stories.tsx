import { UserGrid } from "../UserGrid";
import { UserGridItem } from "../../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedUsers } from "../../UserList/__stories__";
import { UserGridItemStory } from "../../UserGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserGrid",
  component: UserGrid,
  decorators: [withThemedBackground],
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
