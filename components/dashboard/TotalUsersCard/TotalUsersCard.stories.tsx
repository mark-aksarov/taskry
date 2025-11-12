import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCard } from "./TotalUsersCard";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalUsersCard",
  component: TotalUsersCard,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
  args: {
    totalUsers: 15,
  },
} satisfies Meta<typeof TotalUsersCard>;

export default meta;
type Story = StoryObj<typeof TotalUsersCard>;

export const Default = {} satisfies Story;
