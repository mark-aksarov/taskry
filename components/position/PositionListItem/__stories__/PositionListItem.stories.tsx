import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionsProvider } from "../../DeletePositionsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/PositionListItem",
  component: PositionListItem,
  decorators: [
    withDeletePositionsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Position 1",
    updatePosition: () => ({ status: "success" }),
    deletePosition: () => ({ status: "success" }),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
