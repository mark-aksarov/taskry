import { Heart } from "lucide-react";
import { DocsSectionCard } from "./DocsSectionCard";
import { IconWrapper } from "@/site/common/IconWrapper";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/DocsSectionCard",
  component: DocsSectionCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof DocsSectionCard>;

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
