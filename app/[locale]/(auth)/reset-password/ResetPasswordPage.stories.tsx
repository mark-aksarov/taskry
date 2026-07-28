import ResetPasswordNotFound from "./not-found";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/ResetPasswordPage",
  component: ResetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const NotFound = {
  render: () => <ResetPasswordNotFound />,
} satisfies Story;
