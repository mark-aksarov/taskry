import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksEmptySection } from "./TasksEmptySection";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TasksEmptySection",
  component: TasksEmptySection,
  decorators: [withDashboardLayoutProviders],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TasksEmptySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
