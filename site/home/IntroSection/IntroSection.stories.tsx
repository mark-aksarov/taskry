import { IntroSection } from "./IntroSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/IntroSection",
  component: IntroSection,
  decorators: [withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IntroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
