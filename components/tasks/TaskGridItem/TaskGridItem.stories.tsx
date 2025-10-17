import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItem } from "./TaskGridItem";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[250px]">
        <Story />
      </div>
    ),
  ],
  args: {
    task: tasksMock[0],
  },
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof TaskGridItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    task: undefined,
  },
};

export const WithoutCreator: Story = {
  args: {
    task: {
      ...tasksMock[0],
      creator: null,
    },
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
