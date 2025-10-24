import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileDetailPanelHeaderSkeleton } from "./ProfileDetailPanelHeaderSkeleton";

const meta = {
  title: "components/profile/ProfileDetailPanelHeaderSkeleton",
  component: ProfileDetailPanelHeaderSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileDetailPanelHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
