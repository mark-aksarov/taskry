import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";
import {
  notificationsMock,
  NotificationList,
} from "../../notifications/NotificationList";
import { mocked } from "storybook/test";
import { getNotifications } from "@/lib/queries/notification";
import { NotificationPopoverTrigger } from "@/components/notifications/NotificationPopoverTrigger";
import { Suspense } from "react";
import { NotificationSheetTrigger } from "@/components/notifications/NotificationSheetTrigger";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";

const meta = {
  title: "Components/layout/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Dashboard",
  },
  render: (args) => (
    <AppHeader
      {...args}
      notificationPopoverTrigger={
        <NotificationPopoverTrigger
          notificationList={
            <Suspense>
              <NotificationList />
            </Suspense>
          }
        />
      }
      notificationSheetTrigger={
        <NotificationSheetTrigger
          notificationList={
            <Suspense>
              <NotificationList />
            </Suspense>
          }
        />
      }
      appBottomSheetTrigger={<AppBottomSheetTrigger />}
      appSidebarSheetTrigger={<AppSidebarSheetTrigger />}
    />
  ),
  beforeEach: () => {
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Desktop = {} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
