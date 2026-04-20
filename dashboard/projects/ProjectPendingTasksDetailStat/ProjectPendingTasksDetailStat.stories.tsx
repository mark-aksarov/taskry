import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectPendingTasksDetailStat } from "./ProjectPendingTasksDetailStat";

const meta = {
  title: "dashboard/projects/ProjectPendingTasksDetailStat",
  component: ProjectPendingTasksDetailStat,
  decorators: [withThemedBackground],
  args: {
    value: 20,
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectPendingTasksDetailStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
