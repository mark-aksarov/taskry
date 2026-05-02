import { Heart } from "lucide-react";
import { DocsCardLink } from "./DocsCardLink";
import { IconWrapper } from "@/site/common/IconWrapper";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/docs/DocsCardLink",
  component: DocsCardLink,
  decorators: [withThemedBackground],
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
