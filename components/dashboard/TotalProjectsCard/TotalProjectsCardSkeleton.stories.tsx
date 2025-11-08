import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCardSkeleton } from "./TotalProjectsCardSkeleton";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/dashboard/TotalProjectsCardSkeleton",
  component: TotalProjectsCardSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof TotalProjectsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
