import { AppFooter } from "./AppFooter";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/layout/AppFooter",
  component: AppFooter,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
