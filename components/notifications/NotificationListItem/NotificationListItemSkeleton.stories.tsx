import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationListItemSkeleton } from "./NotificationListItemSkeleton";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/notifications/NotificationListItemSkeleton",
  component: NotificationListItemSkeleton,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof NotificationListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
