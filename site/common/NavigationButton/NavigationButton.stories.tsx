import { NavigationButton } from "./NavigationButton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/common/NavigationButton",
  component: NavigationButton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    heading: "Heading",
    subtext: "Subtext",
  },
} satisfies Story;
