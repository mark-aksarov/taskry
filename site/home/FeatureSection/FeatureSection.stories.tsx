import { FeatureSection } from "./FeatureSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/FeatureSection",
  component: FeatureSection,
  decorators: [withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
