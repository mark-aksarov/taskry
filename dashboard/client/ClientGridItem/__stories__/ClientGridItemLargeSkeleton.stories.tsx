import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ClientGridItemLargeSkeleton } from "../ClientGridItemSkeleton";

const meta = {
  title: "dashboard/clients/ClientGridItemLargeSkeleton",
  component: ClientGridItemLargeSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ClientGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
