import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserHeaderSkeleton } from "./UserHeaderSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserHeaderSkeleton",
  component: UserHeaderSkeleton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
