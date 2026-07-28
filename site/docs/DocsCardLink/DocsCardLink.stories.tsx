import { DocsCardLink } from "./DocsCardLink";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/docs/DocsCardLink",
  component: DocsCardLink,
} satisfies Meta<typeof DocsCardLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    href: "#",
    heading: "Heading",
    subtext: "Subtext",
  },
} satisfies Story;
