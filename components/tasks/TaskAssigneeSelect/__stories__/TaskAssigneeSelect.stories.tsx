import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskAssigneeSelect",
  component: TaskAssigneeSelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskAssigneeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    users: [
      {
        id: "user-1",
        fullName: "User 1",
      },
      {
        id: "user-2",
        fullName: "User 2",
      },
      {
        id: "user-3",
        fullName: "User 3",
      },
      {
        id: "user-4",
        fullName: "User 4",
      },
      {
        id: "user-5",
        fullName: "User 5",
      },
      {
        id: "user-6",
        fullName: "User 6",
      },
      {
        id: "user-7",
        fullName: "User 7",
      },
      {
        id: "user-8",
        fullName: "User 8",
      },
      {
        id: "user-9",
        fullName: "User 9",
      },
      {
        id: "user-10",
        fullName: "User 10",
      },
    ],
  },
} satisfies Story;
