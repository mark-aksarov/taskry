import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCard } from "./TotalUsersCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/users/TotalUsersCard",
  component: TotalUsersCard,
  decorators: [withThemedBackground],
  args: {
    totalUsers: 15,
  },
} satisfies Meta<typeof TotalUsersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
