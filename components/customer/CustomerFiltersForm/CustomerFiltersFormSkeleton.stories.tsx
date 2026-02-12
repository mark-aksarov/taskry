import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersFormSkeleton } from "./CustomerFiltersFormSkeleton";

const meta = {
  title: "components/customers/CustomerFiltersFormSkeleton",
  component: CustomerFiltersFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof CustomerFiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
