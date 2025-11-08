import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItem } from "./TaskGridItem";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  tags: ["autodocs"],
  decorators: [withContainerWidth("250px"), withBackgroundVariant()],
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof TaskGridItem>;

export const Default = {
  args: {
    task: {
      id: 1,
      title: "Design homepage",
      deadline: new Date("2025-09-28"),
      creator: { id: "user1", imageUrl: "/man.jpg", fullName: "Liam Turner" },
      subtasks: [{ isDone: false }, { isDone: true }, { isDone: false }],
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    task: undefined,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    task: {
      ...Default.args.task,
      creator: null,
    },
  },
} satisfies Story;
