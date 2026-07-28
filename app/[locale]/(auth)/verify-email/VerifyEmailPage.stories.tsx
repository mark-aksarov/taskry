import { VerifyEmailPage } from "./VerifyEmailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/VerifyEmailPage",
  component: VerifyEmailPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof VerifyEmailPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    email: "a@b.c",
  },
} satisfies Story;
