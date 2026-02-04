import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskAssigneeSelect } from "./TaskAssigneeSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskAssigneeSelect",
  component: TaskAssigneeSelect,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskAssigneeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    users: [
      {
        id: "user1",
        fullName: "John Doe",
      },
      {
        id: "user2",
        fullName: "Jane Smith",
      },
      {
        id: "user3",
        fullName: "Michael Johnson",
      },
      {
        id: "user4",
        fullName: "Emily Davis",
      },
      {
        id: "user5",
        fullName: "Daniel Wilson",
      },
      {
        id: "user6",
        fullName: "Sophia Martinez",
      },
      {
        id: "user7",
        fullName: "James Brown",
      },
      {
        id: "user8",
        fullName: "Olivia Garcia",
      },
      {
        id: "user9",
        fullName: "William Miller",
      },
      {
        id: "user10",
        fullName: "Ava Taylor",
      },
    ],
  },
} satisfies Story;
