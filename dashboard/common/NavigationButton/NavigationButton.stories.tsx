import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationButton } from "./NavigationButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/NavigationButton",
  component: NavigationButton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    href: "/projects",
    variant: "primary",
    label: "Navigation Item",
  },
} satisfies Story;

export const PrimaryActive = {
  args: {
    href: "/",
    variant: "primary",
    label: "Navigation Item",
    isActive: true,
  },
} satisfies Story;

export const PrimaryPending = {
  args: {
    href: "/projects",
    variant: "primary",
    label: "Navigation Item",
    isPending: true,
  },
} satisfies Story;

export const Secondary = {
  args: {
    href: "/projects",
    variant: "secondary",
    label: "Navigation Item",
  },
} satisfies Story;

export const SecondaryActive = {
  args: {
    href: "/",
    variant: "secondary",
    label: "Navigation Item",
    isActive: true,
  },
} satisfies Story;

export const SecondaryPending = {
  args: {
    href: "/projects",
    variant: "secondary",
    label: "Navigation Item",
    isPending: true,
  },
} satisfies Story;
