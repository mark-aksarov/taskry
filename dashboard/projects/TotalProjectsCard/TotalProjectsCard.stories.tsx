import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCard } from "./TotalProjectsCard";

const meta = {
  title: "dashboard/projects/TotalProjectsCard",
  component: TotalProjectsCard,
  args: {
    totalProjects: 50,
  },
} satisfies Meta<typeof TotalProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
