import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserNavigationMobileLink } from "./UserNavigationMobileLink";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserNavigationMobileLink",
  component: UserNavigationMobileLink,
  args: {
    children: "Button",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserNavigationMobileLink>;

export default meta;
type Story = StoryObj<typeof UserNavigationMobileLink>;

export const Default = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;

export const Selected = {
  ...Default,
  args: {
    isSelected: true,
  },
} satisfies Story;
