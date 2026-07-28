import { SignInPage } from "./SignInPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/SignInPage",
  component: SignInPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof SignInPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
