import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserNavigationMobileLink } from "./UserNavigationMobileLink";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserNavigationMobileLink",
  component: UserNavigationMobileLink,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserNavigationMobileLink>;

export default meta;
type Story = StoryObj<typeof UserNavigationMobileLink>;

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
