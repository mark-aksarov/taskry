import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCardSkeleton } from "./TotalProjectsCardSkeleton";

const meta = {
  title: "dashboard/projects/TotalProjectsCardSkeleton",
  component: TotalProjectsCardSkeleton,
} satisfies Meta<typeof TotalProjectsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
