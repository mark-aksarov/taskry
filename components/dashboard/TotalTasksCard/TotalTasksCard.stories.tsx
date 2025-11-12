import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCard } from "./TotalTasksCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/dashboard/TotalTasksCard",
  component: TotalTasksCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  args: {
    totalTasks: 500,
  },
} satisfies Meta<typeof TotalTasksCard>;

export default meta;
type Story = StoryObj<typeof TotalTasksCard>;

export const Default = {} satisfies Story;
