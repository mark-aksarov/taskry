import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationButton } from "./NavigationButton";

const meta = {
  title: "Components/common/NavigationButton",
  component: NavigationButton,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    href: "/projects",
    variant: "primary",
    children: "Navigation Item",
  },
};

export const PrimaryActive: Story = {
  args: {
    href: "/",
    variant: "primary",
    children: "Navigation Item",
    isActive: true,
  },
};

export const Secondary: Story = {
  args: {
    href: "/projects",
    variant: "secondary",
    children: "Navigation Item",
  },
};

export const SecondaryActive: Story = {
  args: {
    href: "/",
    variant: "secondary",
    children: "Navigation Item",
    isActive: true,
  },
};
