import { mocked } from "storybook/test";
import { getTasks } from "@/lib/queries/task";
import { ProfileTaskList } from "./ProfileTaskList";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/profile/ProfileTaskList",
  component: ProfileTaskList,
  parameters: { layout: "fullscreen" },
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
  },
} satisfies Meta<typeof ProfileTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
