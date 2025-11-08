import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoSkeleton } from "./ProfileInfoSkeleton";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileInfoSkeleton",
  component: ProfileInfoSkeleton,
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProfileInfoSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
