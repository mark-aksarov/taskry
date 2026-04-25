import AcceptInviteNotFound from "./not-found";
import { AcceptInvitePage } from "./AcceptInvitePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/AcceptInvitePage",
  component: AcceptInvitePage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof AcceptInvitePage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    email: "user-1@example.com",
    acceptInvite: () => ({ status: "success" }),
  },
} satisfies Story;

export const NotFound = {
  ...Default,
  render: () => <AcceptInviteNotFound />,
} satisfies Story;
