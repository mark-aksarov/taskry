import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";
import { ProjectSelect } from "./ProjectSelect";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/tasks/ProjectSelect",
  component: ProjectSelect,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProjectSelect>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projects: [
      {
        id: 1,
        title: "Website Redesign",
      },
      {
        id: 2,
        title: "Mobile App Launch",
      },
      {
        id: 3,
        title: "Marketing Campaign Q2",
      },
      {
        id: 4,
        title: "Server Migration",
      },
      {
        id: 5,
        title: "SEO Optimization",
      },
      {
        id: 6,
        title: "Internal Dashboard",
      },
      {
        id: 7,
        title: "Customer Feedback Collection",
      },
      {
        id: 8,
        title: "Product Photography",
      },
      {
        id: 9,
        title: "Cloud Security Audit",
      },
      {
        id: 10,
        title: "Annual Report 2025",
      },
    ],
  },
} satisfies Story;
