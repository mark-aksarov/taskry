import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskInfoPage from "./page";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { PageDecorator } from "@/.storybook/decorators";
import { getTask } from "@/lib/queries/task";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta: Meta<typeof TaskInfoPage> = {
  title: "components/pages/TaskInfo",
  component: TaskInfoPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/info");
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(tasksMock[0]), 2000)),
    );
  },
};
