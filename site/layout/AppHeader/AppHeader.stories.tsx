import { AppHeader } from "./AppHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";

const meta = {
  title: "site/layout/AppHeader",
  component: AppHeader,
  decorators: [withCurrentUserProvider, withThemedBackground],
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
