import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "../Link";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/ui/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "#",
    children: "Link",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoVariant = {
  args: {
    className: "text-black dark:text-white",
  },
} satisfies Story;

export const Primary = {
  args: {
    variant: "primary",
  },
} satisfies Story;

export const CustomClasses = {
  args: {
    className:
      "text-green-700 hover:text-green-600 active:text-green-800 dark:text-green-600 dark:hover:text-green-500 dark:active:text-green-700",
  },
} satisfies Story;
