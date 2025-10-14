import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileTasksPage from "./page";
import { mocked } from "storybook/test";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { Suspense } from "react";
import { Layout as RootLayout } from "@/app/layout";
import ProfileLayout from "../layout";
import { getTasks } from "@/lib/queries/task";
import { tasksMock } from "@/components/tasks/TaskList";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/components/notifications/NotificationOverlayList";

const meta: Meta<typeof ProfileTasksPage> = {
  title: "components/pages/ProfileTasks",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <Suspense>
        <RootLayout>
          <ProfileLayout>
            <Story />
          </ProfileLayout>
        </RootLayout>
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "profile",
      "tasks",
    ]);
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoTasks = {
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;

export const Tablet: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: true },
  },
};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
