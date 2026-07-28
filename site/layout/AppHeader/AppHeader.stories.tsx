import { AppHeader } from "./AppHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "site/layout/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
