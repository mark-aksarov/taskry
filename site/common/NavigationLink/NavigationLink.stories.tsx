import { Heart } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/common/NavigationLink",
  component: NavigationLink,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NavigationLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    iconLeft: <Heart size={24} />,
    href: "#",
    heading: "Heading",
    subtext: "Subtext",
  },
} satisfies Story;
