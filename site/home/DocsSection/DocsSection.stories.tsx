import { DocsSection } from "./DocsSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/DocsSection",
  component: DocsSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DocsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
