import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskPage from "./page";
import { Suspense } from "react";
import TaskLayout from "./layout";
import { mocked } from "storybook/test";
import { getTask } from "@/lib/queries/task";
import { Layout as RootLayout } from "@/app/layout";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

const meta = {
  title: "components/pages/Task",
  component: TaskPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <Suspense>
        <RootLayout>
          <TaskLayout params={new Promise((resolve) => resolve({ id: "1" }))}>
            <Story />
          </TaskLayout>
        </RootLayout>
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "tasks",
      "1",
    ]);
  },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
} satisfies Meta<typeof TaskPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
