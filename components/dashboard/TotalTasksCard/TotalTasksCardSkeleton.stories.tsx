import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCardSkeleton } from "./TotalTasksCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/dashboard/TotalTasksCardSkeleton",
  component: TotalTasksCardSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TotalTasksCardSkeleton>;

export default meta;
type Story = StoryObj<typeof TotalTasksCardSkeleton>;

export const Default: Story = {};
