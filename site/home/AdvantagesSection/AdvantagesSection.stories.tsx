import { AdvantagesSection } from "./AdvantagesSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/AdvantagesSection",
  component: AdvantagesSection,
  decorators: [withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AdvantagesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
