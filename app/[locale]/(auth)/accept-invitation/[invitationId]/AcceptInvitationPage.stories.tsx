import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AcceptInvitationPage } from "./AcceptInvitationPage";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/AcceptInvitationPage",
  component: AcceptInvitationPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof AcceptInvitationPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    invitationId: "invitationId",
  },
} satisfies Story;
