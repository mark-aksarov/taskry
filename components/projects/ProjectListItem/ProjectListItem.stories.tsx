import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItem } from "./ProjectListItem";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/projects/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    project: {
      id: 1,
      title: "Website Redesign",
      deadline: new Date("2025-06-30"),
      creator: {
        id: "user1",
        fullName: "Alice Smith",
        imageUrl: "/woman.jpg",
      },
      status: {
        nameEn: "Active",
      },
      category: { id: 1, name: "Design" },
      customer: {
        id: 1,
        fullName: "John Doe",
        company: { name: "Doe Inc." },
      },
      tasks: [
        { statusId: 1 },
        { statusId: 2 },
        { statusId: 2 },
        { statusId: 3 },
      ],
    },
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    project: {
      ...Default.args.project,
      creator: null,
    },
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    showCheckbox: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    project: undefined,
  },
} satisfies Story;
