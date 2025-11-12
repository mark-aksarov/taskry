import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalCustomersCardSkeleton } from "./TotalCustomersCardSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalCustomersCardSkeleton",
  component: TotalCustomersCardSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof TotalCustomersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
