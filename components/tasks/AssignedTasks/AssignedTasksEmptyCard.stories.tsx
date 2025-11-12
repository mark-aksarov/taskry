import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";

const meta = {
  title: "Components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
