import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { withUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";
import { withDeletePositionsProvider } from "../../DeletePositionsContext/__stories__";
import { withUpdatePositionModalProvider } from "../../UpdatePositionModal/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/PositionListItem",
  component: PositionListItem,
  decorators: [
    // mocking providers
    withDeletePositionProvider,
    withUpdatePositionProvider,
    withUpdatePositionModalProvider,
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
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
