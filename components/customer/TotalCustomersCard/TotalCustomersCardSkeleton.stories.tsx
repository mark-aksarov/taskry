import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalCustomersCardSkeleton } from "./TotalCustomersCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/TotalCustomersCardSkeleton",
  component: TotalCustomersCardSkeleton,
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TotalCustomersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
