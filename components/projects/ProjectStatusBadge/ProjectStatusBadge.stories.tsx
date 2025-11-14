import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

const meta = {
  title: "Components/projects/ProjectStatusBadge",
  component: ProjectStatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending = {
  args: {
    status: {
      id: "pending",
      name: "Pending",
    },
  },
} satisfies Story;

export const Active = {
  args: {
    status: {
      id: "active",
      name: "Active",
    },
  },
} satisfies Story;

export const Completed = {
  args: {
    status: {
      id: "completed",
      name: "Completed",
    },
  },
} satisfies Story;
