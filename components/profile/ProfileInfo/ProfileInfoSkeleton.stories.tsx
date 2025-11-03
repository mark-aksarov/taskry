import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoSkeleton } from "./ProfileInfoSkeleton";

const meta = {
  title: "components/profile/ProfileInfoSkeleton",
  component: ProfileInfoSkeleton,
} satisfies Meta<typeof ProfileInfoSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
