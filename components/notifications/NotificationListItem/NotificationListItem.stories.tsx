import { Meta, StoryObj } from "@storybook/react";
import { NotificationListItem } from "./NotificationListItem";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";

const meta = {
  title: "Components/notifications/NotificationListItem",
  component: NotificationListItem,
  tags: ["autodocs"],
  args: {
    notification: notificationsMock[0],
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotificationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCreator: Story = {
  args: {
    notification: {
      ...notificationsMock[0],
      notification: {
        ...notificationsMock[0].notification,
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
    viewport: { value: "mobile2", isRotated: false },
  },
};
