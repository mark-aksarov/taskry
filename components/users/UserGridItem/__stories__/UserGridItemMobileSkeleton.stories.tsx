import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItemMobileSkeleton } from "../UserGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserGridItemMobileSkeleton",
  component: UserGridItemMobileSkeleton,
  decorators: [withThemedBackground],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof UserGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
