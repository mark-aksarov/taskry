import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailSkeleton } from "../UserDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserDetailSkeleton",
  component: UserDetailSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
