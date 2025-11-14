import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCardSkeleton } from "./TotalUsersCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/users/TotalUsersCardSkeleton",
  component: TotalUsersCardSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TotalUsersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
