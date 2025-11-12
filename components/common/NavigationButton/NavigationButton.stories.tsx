import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationButton } from "./NavigationButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/common/NavigationButton",
  component: NavigationButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
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
    children: "Navigation Item",
  },
} satisfies Story;

export const PrimaryActive = {
  args: {
    href: "/",
    variant: "primary",
    children: "Navigation Item",
    isActive: true,
  },
} satisfies Story;

export const Secondary = {
  args: {
    href: "/projects",
    variant: "secondary",
    children: "Navigation Item",
  },
} satisfies Story;

export const SecondaryActive = {
  args: {
    href: "/",
    variant: "secondary",
    children: "Navigation Item",
    isActive: true,
  },
} satisfies Story;
