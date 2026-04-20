import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectActiveTasksDetailStat } from "./ProjectActiveTasksDetailStat";

const meta = {
  title: "components/projects/ProjectActiveTasksDetailStat",
  component: ProjectActiveTasksDetailStat,
  decorators: [withThemedBackground],
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
