import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskSubtasksPage from "./page";
import { mocked } from "storybook/internal/test";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { useParams, usePathname } from "next/navigation";
import { getSubtasksByTask, getTask } from "@/lib/queries/task";
import { subtasksMock } from "@/lib/data/__mocks__/subtasks";
import { PageDecorator } from "@/.storybook/decorators";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "components/pages/TaskSubtasks",
  component: TaskSubtasksPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
    mocked(getSubtasksByTask).mockReturnValue(
      new Promise((res) => res(subtasksMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/subtasks");
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskSubtasksPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(tasksMock[0]), 2000)),
    );
    mocked(getSubtasksByTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(subtasksMock), 2000)),
    );
  },
};

export const WithNoSubtasks = {
  beforeEach: () => {
    mocked(getSubtasksByTask).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
