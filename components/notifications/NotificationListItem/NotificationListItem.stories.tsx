import { Meta, StoryObj } from "@storybook/react";
import { NotificationListItem } from "./NotificationListItem";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/notifications/NotificationListItem",
  component: NotificationListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof NotificationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notification: {
      notificationId: 1,
      isRead: false,
      notification: {
        type: "TASK_ADDED",
        targetName: "Create Landing Page",
        createdAt: new Date("2025-09-23T08:00:00Z"),
        actor: {
          id: "user-2",
          fullName: "Alice Johnson",
          imageUrl: "/woman.jpg",
        },
        target: {
          project: { id: 10, title: "Website Redesign" },
        },
      },
    },
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    notification: {
      ...Default.args.notification,
      notification: {
        ...Default.args.notification.notification,
        actor: undefined,
      },
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    notification: undefined,
  },
} satisfies Story;
