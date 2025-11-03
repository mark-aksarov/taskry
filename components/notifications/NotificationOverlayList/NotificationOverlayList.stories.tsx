import { Suspense } from "react";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { getNotifications } from "@/lib/queries/notification";
import { NotificationOverlayList } from "./NotificationOverlayList";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";

const meta = {
  title: "Components/notifications/NotificationOverlayList",
  component: NotificationOverlayList,
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
} satisfies Meta<typeof NotificationOverlayList>;

export default meta;
type Story = StoryObj<typeof NotificationOverlayList>;

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
