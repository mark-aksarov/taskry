import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskSubtasksPage from "./page";
import { mocked } from "storybook/internal/test";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { getSubtasksByTask } from "@/lib/queries/task";
import { subtasksMock } from "@/lib/data/__mocks__/subtasks";
import { PageDecorator } from "@/.storybook/decorators";

const meta = {
  title: "components/pages/TaskSubtasks",
  component: TaskSubtasksPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getSubtasksByTask).mockReturnValue(
      new Promise((res) => res(subtasksMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/subtasks");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "tasks",
      "1",
      "subtasks",
    ]);
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskSubtasksPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoComments = {
  beforeEach: () => {
    mocked(getSubtasksByTask).mockReturnValue(new Promise((res) => res([])));
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
