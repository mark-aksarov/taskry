import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectItem } from "./ProjectItem";
import { ProjectPreview } from "@/lib/queries/types";
import { ACTIVE_PROJECT_STATUS_ID } from "@/lib/queries/constants";

const projectMock: ProjectPreview = {
  id: 1,
  title: "Website Redesign",
  description: "Redesign the company website for better UX",
  creatorId: "user1",
  statusId: ACTIVE_PROJECT_STATUS_ID,
  categoryId: 1,
  customerId: 1,
  createdAt: new Date("2025-01-10"),
  updatedAt: new Date("2025-02-05"),
  deadline: new Date("2025-06-30"),
  creator: { name: "Alice Smith", imageUrl: "/woman.jpg" },
  status: {
    id: ACTIVE_PROJECT_STATUS_ID,
    nameEn: "Active",
    nameRu: "Активный",
  },
  category: { name: "Design" },
  customer: { fullName: "John Doe", company: { name: "Doe Inc." } },
  tasks: [{ statusId: 1 }, { statusId: 2 }, { statusId: 2 }, { statusId: 3 }],
};

const meta = {
  title: "Components/projects/ProjectItem",
  component: ProjectItem,
  tags: ["autodocs"],
  args: {
    project: projectMock,
  },
} satisfies Meta<typeof ProjectItem>;

export default meta;
type Story = StoryObj<typeof ProjectItem>;

export const Default: Story = {};

export const WithoutCreator: Story = {
  args: {
    project: {
      ...projectMock,
      creator: null,
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    showCheckbox: true,
  },
};

export const Skeleton: Story = {
  args: {
    project: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
