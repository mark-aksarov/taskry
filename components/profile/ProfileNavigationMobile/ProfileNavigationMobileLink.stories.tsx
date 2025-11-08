import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileNavigationMobileLink } from "./ProfileNavigationMobileLink";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileNavigationMobileLink",
  component: ProfileNavigationMobileLink,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
  decorators: [withBackgroundVariant()],
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
