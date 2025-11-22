import { fn } from "storybook/test";
import { SignUpPage } from "./SignUpPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";

const meta = {
  title: "components/pages/SignUpPage",
  component: SignUpPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof SignUpPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: "John Doe",
    email: "2MhDx@example.com",
    password: "password",
    setName: fn(),
    setEmail: fn(),
    setPassword: fn(),
    isSubmitting: false,
    setIsSubmitting: fn(),
    handleSubmit: fn(),
  },
} satisfies Story;
