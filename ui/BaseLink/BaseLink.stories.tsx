import { BaseLink } from "./BaseLink";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "UI/BaseLink",
  component: BaseLink,
  args: {
    href: "#",
    children: "BaseLink",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof BaseLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    className: "text-black dark:text-white",
  },
} satisfies Story;

export const CustomClasses = {
  args: {
    className:
      "text-green-700 hover:text-green-600 active:text-green-800 dark:text-green-600 dark:hover:text-green-500 dark:active:text-green-700",
  },
} satisfies Story;
