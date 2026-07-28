import { SignUpPage } from "./SignUpPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/SignUpPage",
  component: SignUpPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof SignUpPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
