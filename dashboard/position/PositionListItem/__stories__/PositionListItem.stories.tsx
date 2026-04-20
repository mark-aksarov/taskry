import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionListItem } from "../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";
import { withDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { withDeletePositionsProvider } from "../../DeletePositionsProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/positions/PositionListItem",
  component: PositionListItem,
  decorators: [
    withUpdatePositionProvider,
    withDeletePositionProvider,

    withDeletePositionsProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,

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
