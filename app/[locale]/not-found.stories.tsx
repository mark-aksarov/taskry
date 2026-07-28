import NotFound from "./not-found";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "pages/NotFound",
  component: NotFound,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
