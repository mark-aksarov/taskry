import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalCustomersCardSkeleton } from "./TotalCustomersCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/TotalCustomersCardSkeleton",
  component: TotalCustomersCardSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TotalCustomersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
