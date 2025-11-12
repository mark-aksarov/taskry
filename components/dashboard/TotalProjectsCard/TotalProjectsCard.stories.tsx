import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCard } from "./TotalProjectsCard";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/TotalProjectsCard",
  component: TotalProjectsCard,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
  args: {
    totalProjects: 50,
  },
} satisfies Meta<typeof TotalProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
