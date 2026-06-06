import { RoadmapSection } from "./RoadmapSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/RoadmapSection",
  component: RoadmapSection,
  decorators: [withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RoadmapSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
