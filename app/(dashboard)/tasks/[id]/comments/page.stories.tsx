import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskCommentsPage from "./page";
import { mocked } from "storybook/internal/test";
import { getCommentsByTask } from "@/lib/queries/comments";
import { commentsMock } from "@/lib/data/__mocks__/comments";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { PageDecorator } from "@/.storybook/decorators";
import { getTask } from "@/lib/queries/task";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "components/pages/TaskComments",
  component: TaskCommentsPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
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
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskCommentsPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(tasksMock[0]), 2000)),
    );
    mocked(getCommentsByTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(commentsMock), 2000)),
    );
  },
};

export const WithNoComments = {
  beforeEach: () => {
    mocked(getCommentsByTask).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
