import { PositionListItemSkeleton } from "../PositionListItemSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/positions/PositionListItemSkeleton",
  component: PositionListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
