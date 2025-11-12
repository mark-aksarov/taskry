import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationListItemSkeleton } from "./NotificationListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/notifications/NotificationListItemSkeleton",
  component: NotificationListItemSkeleton,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
