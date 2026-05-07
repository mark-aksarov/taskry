import { ErrorBanner } from "./ErrorBanner";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "common/ErrorBanner",
  component: ErrorBanner,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ErrorBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: "Error message",
  },
} satisfies Story;
