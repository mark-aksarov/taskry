import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AcceptInvitationPage } from "./AcceptInvitationPage";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/AcceptInvitationPage",
  component: AcceptInvitationPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof AcceptInvitationPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    invitationId: "invitationId",
  },
} satisfies Story;
