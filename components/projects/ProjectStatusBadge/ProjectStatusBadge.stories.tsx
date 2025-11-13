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
      id: 1,
      name: "Pending",
    },
  },
} satisfies Story;

export const Active = {
  args: {
    status: {
      id: 2,
      name: "Active",
    },
  },
} satisfies Story;

export const Completed = {
  args: {
    status: {
      id: 3,
      name: "Completed",
    },
  },
} satisfies Story;
