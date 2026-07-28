import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCompletedTasksDetailStat } from "./ProjectCompletedTasksDetailStat";

const meta = {
  title: "dashboard/projects/ProjectCompletedTasksDetailStat",
  component: ProjectCompletedTasksDetailStat,
  args: {
    value: 20,
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectCompletedTasksDetailStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
