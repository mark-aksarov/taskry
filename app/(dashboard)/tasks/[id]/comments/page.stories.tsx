import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskCommentsPage from "./page";
import { Suspense } from "react";
import { Layout as RootLayout } from "@/app/layout";
import TaskLayout from "../layout";
import { mocked } from "storybook/internal/test";
import { getCommentsByTask } from "@/lib/queries/comments";
import { commentsMock } from "@/lib/data/__mocks__/comments";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

const meta = {
  title: "components/pages/TaskComments",
  component: TaskCommentsPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
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
    mocked(getCommentsByTask).mockReturnValue(
      new Promise((res) => res(commentsMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/comments");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "tasks",
      "1",
      "comments",
    ]);
  },
} satisfies Meta<typeof TaskCommentsPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
