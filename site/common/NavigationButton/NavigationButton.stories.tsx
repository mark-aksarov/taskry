import { NavigationButton } from "./NavigationButton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Heart } from "lucide-react";

const meta = {
  title: "site/common/NavigationButton",
  component: NavigationButton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NavigationButton>;

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
