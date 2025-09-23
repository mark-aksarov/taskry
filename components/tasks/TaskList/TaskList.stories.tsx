import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskList } from "./TaskList";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { getTasks } from "@/lib/queries/task";
import { mockedTasks } from "./mockedTasks";

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
    mocked(getTasks).mockReturnValue(new Promise((res) => res(mockedTasks)));
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
