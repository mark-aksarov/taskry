import { IntroSection } from "./IntroSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/IntroSection",
  component: IntroSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IntroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
