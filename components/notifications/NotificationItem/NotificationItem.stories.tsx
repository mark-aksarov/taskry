import { Meta, StoryObj } from "@storybook/react";
import { NotificationRecipientWithRelations } from "@/lib/queries/types";
import { NotificationItem } from "./NotificationItem";

const notificationMock: NotificationRecipientWithRelations = {
  notificationId: 1,
  userId: "1",
  isRead: true,
  readAt: null,
  workspaceId: 1,

  notification: {
    id: 1,
    type: "PROJECT_ADDED",
    targetName: null,
    createdAt: new Date(),
    updatedAt: new Date(),

    actor: {
      id: "1",
      name: "John Doe",
      imageUrl: "/man.jpg",
    },

    target: {
      id: 1,
      project: { id: 1, title: "Project Title" },
      task: null,
      message: null,
      user: null,
      customer: null,
    },
  },
};

const meta = {
  title: "Components/notifications/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  args: {
    notification: notificationMock,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCreator: Story = {
  args: {
    notification: {
      ...notificationMock,
      notification: {
        ...notificationMock.notification,
        actor: null,
      },
    },
  },
};

export const Skeleton: Story = {
  args: {
    notification: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
