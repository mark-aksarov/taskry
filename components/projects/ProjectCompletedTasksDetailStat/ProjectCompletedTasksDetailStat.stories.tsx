import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCompletedTasksDetailStat } from "./ProjectCompletedTasksDetailStat";

const meta = {
  title: "components/projects/ProjectCompletedTasksDetailStat",
  component: ProjectCompletedTasksDetailStat,
  decorators: [withThemedBackground],
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
