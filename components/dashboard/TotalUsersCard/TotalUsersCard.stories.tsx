import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCard } from "./TotalUsersCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/dashboard/TotalUsersCard",
  component: TotalUsersCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  args: {
    totalUsers: 15,
  },
} satisfies Meta<typeof TotalUsersCard>;

export default meta;
type Story = StoryObj<typeof TotalUsersCard>;

export const Default = {} satisfies Story;
