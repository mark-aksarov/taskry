import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItem } from "./TaskListItem";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskListItem",
  component: TaskListItem,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    project: { id: 1, title: "Website Redesign" },
    category: { id: 1, name: "Design" },
    status: { id: 1, name: "Pending" },
    creator: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
    totalSubtasks: 6,
    subtasksDone: 2,
    commentsCount: 10,
    subtasksCount: 6,
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;
