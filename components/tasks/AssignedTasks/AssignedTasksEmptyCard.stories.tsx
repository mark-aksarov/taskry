import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";

const meta = {
  title: "Components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
