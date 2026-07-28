import { FaqSection } from "./FaqSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/home/FaqSection",
  component: FaqSection,
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
