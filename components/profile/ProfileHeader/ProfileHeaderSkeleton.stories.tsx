import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/profile/ProfileHeaderSkeleton",
  component: ProfileHeaderSkeleton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
