import { NavigationLink } from "./NavigationLink";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/common/NavigationLink",
  component: NavigationLink,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    href: "#",
  },
} satisfies Meta<typeof NavigationLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    variant: "primary",
    label: "Navigation Item",
  },
} satisfies Story;

export const PrimaryActive = {
  args: {
    variant: "primary",
    label: "Navigation Item",
    isActive: true,
  },
} satisfies Story;

export const PrimaryDisabled = {
  args: {
    variant: "primary",
    label: "Navigation Item",
    isDisabled: true,
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: "secondary",
    label: "Navigation Item",
  },
} satisfies Story;

export const SecondaryActive = {
  args: {
    variant: "secondary",
    label: "Navigation Item",
    isActive: true,
  },
} satisfies Story;

export const SecondaryDisabled = {
  args: {
    variant: "secondary",
    label: "Navigation Item",
    isDisabled: true,
  },
} satisfies Story;
