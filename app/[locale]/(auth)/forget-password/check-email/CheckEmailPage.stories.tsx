import { CheckEmailPage } from "./CheckEmailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/CheckEmailPage",
  component: CheckEmailPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof CheckEmailPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
