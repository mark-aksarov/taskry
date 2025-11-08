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
    task: {
      id: 1,
      title: "Design landing page",
      deadline: new Date("2025-09-30"),
      project: { title: "Website Redesign", id: 1 },
      creator: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
      status: {
        id: 1,
        nameEn: "Pending",
        nameRu: "Ожидает",
      },
      category: { id: 1, name: "Design" },
      subtasks: [
        { isDone: false },
        { isDone: true },
        { isDone: false },
        { isDone: false },
        { isDone: false },
        { isDone: true },
      ],
      _count: { comments: 10, subtasks: 6 },
    },
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    task: {
      ...Default.args.task,
      creator: undefined,
    },
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    showCheckbox: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    task: undefined,
  },
} satisfies Story;
