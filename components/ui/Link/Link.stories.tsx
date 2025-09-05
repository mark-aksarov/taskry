import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "../Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "#",
    children: "Link",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomClasses: Story = {
  args: {
    className:
      "text-green-700 hover:text-green-600 active:text-green-800 dark:text-green-600 dark:hover:text-green-500 dark:active:text-green-700",
  },
};
