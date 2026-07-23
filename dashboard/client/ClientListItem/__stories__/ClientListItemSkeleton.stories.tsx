import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientListItemSkeleton } from "../ClientListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/clients/ClientListItemSkeleton",
  component: ClientListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ClientListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
