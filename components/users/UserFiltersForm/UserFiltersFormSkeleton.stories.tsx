import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersFormSkeleton } from "./UserFiltersFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserFiltersFormSkeleton",
  component: UserFiltersFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof UserFiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
