import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCardSkeleton } from "./TotalUsersCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/TotalUsersCardSkeleton",
  component: TotalUsersCardSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TotalUsersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
