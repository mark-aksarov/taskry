import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { NotificationPopoverTrigger } from "@/components/notifications/NotificationPopoverTrigger";
import { NotificationOverlayList } from "@/components/notifications/NotificationOverlayList";
import { NotificationSheetTrigger } from "@/components/notifications/NotificationSheetTrigger";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { getNotifications } from "@/lib/queries/notification";
import { useSelectedLayoutSegments } from "next/navigation";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";

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
              <NotificationOverlayList />
            </Suspense>
          }
        />
      }
      notificationSheetTrigger={
        <NotificationSheetTrigger
          notificationList={
            <Suspense>
              <NotificationOverlayList />
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
    mocked(useSelectedLayoutSegments).mockReturnValue(["(dashboard)"]);
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Desktop = {} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;
