import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getNotifications } from "@/lib/queries/notification";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { Suspense } from "react";
import { Repeat } from "@/components/common/Repeat";
import { NotificationListItem } from "../NotificationListItem";
import { Notifications } from "../Notifications";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  tags: ["autodocs"],
  args: {
    notifications: (
      <Suspense
        fallback={
          <Repeat items={7} renderItem={() => <NotificationListItem />} />
        }
      >
        <Notifications />
      </Suspense>
    ),
  },
  beforeEach: () => {
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock)),
    );
  },
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
