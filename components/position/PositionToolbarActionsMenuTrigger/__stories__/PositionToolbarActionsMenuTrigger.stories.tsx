import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionToolbarActionsMenuTrigger } from "../PositionToolbarActionsMenuTrigger";

const meta = {
  title: "components/positions/PositionToolbarActionsMenuTrigger",
  component: PositionToolbarActionsMenuTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof PositionToolbarActionsMenuTrigger>;

export const Default = {
  args: {
    guestMode: false,
  },
} satisfies Story;
