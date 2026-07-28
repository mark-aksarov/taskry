import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectActiveTasksDetailStat } from "./ProjectActiveTasksDetailStat";

const meta = {
  title: "dashboard/projects/ProjectActiveTasksDetailStat",
  component: ProjectActiveTasksDetailStat,
  args: {
    value: 20,
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectActiveTasksDetailStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
