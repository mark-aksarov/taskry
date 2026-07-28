import { AdvantagesSection } from "./AdvantagesSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/AdvantagesSection",
  component: AdvantagesSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AdvantagesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
