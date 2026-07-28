import { RoadmapSection } from "./RoadmapSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/RoadmapSection",
  component: RoadmapSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RoadmapSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
