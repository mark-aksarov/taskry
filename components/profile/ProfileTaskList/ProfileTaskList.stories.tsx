import { ProfileTaskList } from "./ProfileTaskList";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/profile/ProfileTaskList",
  component: ProfileTaskList,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    tasks: tasksMock,
  },
} satisfies Meta<typeof ProfileTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
