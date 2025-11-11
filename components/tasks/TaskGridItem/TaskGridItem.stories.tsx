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
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    creator: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
    totalSubtasks: 6,
    subtasksDone: 2,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;
