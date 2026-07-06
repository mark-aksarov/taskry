import error from "./error";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/Error",
  component: error,
  parameters: { layout: "fullscreen" },
  decorators: [withThemedBackground],
  args: {
    reset: () => {},
    error: new Error("Something went wrong"),
  },
} satisfies Meta<typeof error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
