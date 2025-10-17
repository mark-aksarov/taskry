import { Meta, StoryObj } from "@storybook/react";
import { NotificationOverlayItem } from "./NotificationOverlayItem";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";

const meta = {
  title: "Components/notifications/NotificationOverlayItem",
  component: NotificationOverlayItem,
  tags: ["autodocs"],
  args: {
    notification: notificationsMock[0],
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotificationOverlayItem>;

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
    viewport: { value: "iphone6", isRotated: false },
  },
};
