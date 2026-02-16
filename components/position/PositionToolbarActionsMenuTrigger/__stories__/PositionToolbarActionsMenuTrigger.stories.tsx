import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionToolbarActionsMenuTrigger } from "../PositionToolbarActionsMenuTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/PositionToolbarActionsMenuTrigger",
  component: PositionToolbarActionsMenuTrigger,
  decorators: [withSelectedItemsProvider, withThemedBackground],
} satisfies Meta<typeof PositionToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deletePositions: () => ({ status: "success" }),
  },
} satisfies Story;
