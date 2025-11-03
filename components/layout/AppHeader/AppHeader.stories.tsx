import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { NotificationModalTrigger } from "@/components/notifications/NotificationModalTrigger";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { getNotifications } from "@/lib/queries/notification";
import { useSelectedLayoutSegments } from "next/navigation";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { Notifications } from "@/components/notifications/Notifications";

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
      notificationModalTrigger={
        <NotificationModalTrigger
          notifications={
            <Suspense>
              <Notifications />
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
      new Promise((res) => res(notificationsMock)),
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
