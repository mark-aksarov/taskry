import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTaskListItem } from "./ProfileTaskListItem";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "components/profile/ProfileTaskListItem",
  component: ProfileTaskListItem,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    task: tasksMock[0],
  },
} satisfies Meta<typeof ProfileTaskListItem>;

export default meta;
type Story = StoryObj<typeof ProfileTaskListItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  ...Default,
  args: {
    task: undefined,
  },
};
