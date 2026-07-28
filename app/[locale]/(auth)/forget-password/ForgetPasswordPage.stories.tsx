import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/ForgetPasswordPage",
  component: ForgetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof ForgetPasswordPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
