import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileNavigationMobileLink } from "./ProfileNavigationMobileLink";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/profile/ProfileNavigationMobileLink",
  component: ProfileNavigationMobileLink,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileNavigationMobileLink>;

export default meta;
type Story = StoryObj<typeof ProfileNavigationMobileLink>;

export const Default: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
};

export const Selected: Story = {
  ...Default,
  args: {
    isSelected: true,
  },
};
