import { Suspense } from "react";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { mockedNotifications } from "./mockedNotifications";
import { getNotifications } from "@/lib/queries/notifications";

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
      new Promise((res) => res(mockedNotifications)),
    );
  },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {
  args: {
    notifications: mockedNotifications,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
