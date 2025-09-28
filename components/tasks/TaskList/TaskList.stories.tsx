import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskList } from "./TaskList";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { getTasks } from "@/lib/queries/task";
import { tasksMock } from "./tasksMock";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Suspense>
        <Story />
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
