import { Heart } from "lucide-react";
import { DocsCard } from "./DocsCard";
import { IconWrapper } from "@/site/common/IconWrapper";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/common/DocsCard",
  component: DocsCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof DocsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    iconLeft: (
      <IconWrapper color="pink">
        <Heart size={24} />
      </IconWrapper>
    ),
    href: "#",
    heading: "Heading",
    subtext: "Subtext",
  },
} satisfies Story;
