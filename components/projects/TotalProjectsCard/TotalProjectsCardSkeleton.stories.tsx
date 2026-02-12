import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCardSkeleton } from "./TotalProjectsCardSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/TotalProjectsCardSkeleton",
  component: TotalProjectsCardSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TotalProjectsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
