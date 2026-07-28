import { SecuritySection } from "./SecuritySection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/SecuritySection",
  component: SecuritySection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SecuritySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
