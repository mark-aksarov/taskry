import { PositionGrid } from "../PositionGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionGridExample } from "./PositionGridExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionsProvider } from "../../DeletePositionsProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/positions/PositionGrid",
  component: PositionGrid,
  decorators: [
    withDeletePositionsProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <PositionGridExample />,
  },
} satisfies Story;
