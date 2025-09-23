import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskItem } from "./TaskItem";
import { ACTIVE_TASK_STATUS_ID } from "@/lib/queries/constants";
import { TaskPreview } from "@/lib/queries/types";

const taskMock: TaskPreview = {
  id: 20,
  title: "Conduct user interviews",
  description: "Talk to 5 users about onboarding experience",
  deadline: new Date("2025-11-22"),
  projectId: 6,
  creatorId: "user20",
  categoryId: 14,
  statusId: 2,
  createdAt: new Date("2025-09-20"),
  updatedAt: new Date("2025-09-24"),

  creator: { imageUrl: "/woman.jpg" },
  status: {
    id: ACTIVE_TASK_STATUS_ID,
    nameEn: "Active",
    nameRu: "Активно",
  },
  category: { name: "Research" },
  subtasks: [{ isDone: true }, { isDone: false }],
};

const meta = {
  title: "Components/tasks/TaskItem",
  component: TaskItem,
  tags: ["autodocs"],
  args: {
    task: taskMock,
  },
} satisfies Meta<typeof TaskItem>;

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
