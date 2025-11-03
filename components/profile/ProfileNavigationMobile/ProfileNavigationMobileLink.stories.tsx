import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileNavigationMobileLink } from "./ProfileNavigationMobileLink";

const meta = {
  title: "components/profile/ProfileNavigationMobileLink",
  component: ProfileNavigationMobileLink,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof ProfileNavigationMobileLink>;

export default meta;
type Story = StoryObj<typeof ProfileNavigationMobileLink>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};
