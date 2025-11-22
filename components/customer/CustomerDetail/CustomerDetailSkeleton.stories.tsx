import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailSkeleton } from "./CustomerDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/CustomerDetailSkeleton",
  component: CustomerDetailSkeleton,
  decorators: [
    (Story) => (
      <div className="w-[500px] max-md:w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
