import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "../Link";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";

const meta = {
  title: "Components/ui/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "#",
    children: "Link",
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoVariant: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const CustomClasses: Story = {
  args: {
    className:
      "text-green-700 hover:text-green-600 active:text-green-800 dark:text-green-600 dark:hover:text-green-500 dark:active:text-green-700",
  },
};
