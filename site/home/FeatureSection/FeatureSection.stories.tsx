import { FeatureSection } from "./FeatureSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/FeatureSection",
  component: FeatureSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
