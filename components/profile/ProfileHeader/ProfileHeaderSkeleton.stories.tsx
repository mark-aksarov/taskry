import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";

const meta = {
  title: "components/profile/ProfileHeaderSkeleton",
  component: ProfileHeaderSkeleton,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProfileHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
