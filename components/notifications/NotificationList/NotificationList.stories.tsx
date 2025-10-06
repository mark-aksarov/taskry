import { Suspense } from "react";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { getNotifications } from "@/lib/queries/notification";
import { NotificationList } from "./NotificationList";
import { notificationsMock } from "./notificationsMock";

const meta = {
  title: "Components/notifications/NotificationList",
  component: NotificationList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Suspense>
        <Story />
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {
  args: {
    notifications: notificationsMock,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
