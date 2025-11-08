import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCardSkeleton } from "./TotalUsersCardSkeleton";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/dashboard/TotalUsersCardSkeleton",
  component: TotalUsersCardSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof TotalUsersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof TotalUsersCardSkeleton>;

export const Default: Story = {};
