import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";

const meta = {
  title: "components/profile/ProfileHeaderSkeleton",
  component: ProfileHeaderSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
