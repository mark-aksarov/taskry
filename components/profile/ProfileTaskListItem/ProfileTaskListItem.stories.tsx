import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTaskListItem } from "./ProfileTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/profile/ProfileTaskListItem",
  component: ProfileTaskListItem,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileTaskListItem>;

export default meta;
type Story = StoryObj<typeof ProfileTaskListItem>;

export const Default: Story = {
  args: {},
};

export const Skeleton: Story = {
  ...Default,
  args: {
    task: undefined,
  },
};
