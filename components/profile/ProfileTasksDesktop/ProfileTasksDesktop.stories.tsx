import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTasksDesktop } from "./ProfileTasksDesktop";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileTasksDesktop",
  component: ProfileTasksDesktop,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProfileTasksDesktop>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
