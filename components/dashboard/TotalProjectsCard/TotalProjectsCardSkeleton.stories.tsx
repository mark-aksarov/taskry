import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCardSkeleton } from "./TotalProjectsCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/dashboard/TotalProjectsCardSkeleton",
  component: TotalProjectsCardSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TotalProjectsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
