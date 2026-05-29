import { AppHeader } from "./AppHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/layout/AppHeader",
  component: AppHeader,
  decorators: [withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isGuest: false,
    isEmailVerified: true,
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
