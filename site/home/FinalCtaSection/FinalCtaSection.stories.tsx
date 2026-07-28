import { FinalCtaSection } from "./FinalCtaSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/FinalCtaSection",
  component: FinalCtaSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FinalCtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
