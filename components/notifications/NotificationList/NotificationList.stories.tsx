import { Suspense } from "react";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";

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
      new Promise((res) => res(notificationsMock)),
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
    viewport: { value: "mobile2", isRotated: false },
  },
};
