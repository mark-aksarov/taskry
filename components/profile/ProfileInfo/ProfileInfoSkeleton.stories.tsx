import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoSkeleton } from "./ProfileInfoSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "components/profile/ProfileInfoSkeleton",
  component: ProfileInfoSkeleton,
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProfileInfoSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
