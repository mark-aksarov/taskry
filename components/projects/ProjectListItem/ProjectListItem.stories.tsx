import { ProjectListItem } from "./ProjectListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectDetail } from "../ProjectDetail/decorators";

const meta = {
  title: "Components/projects/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [withProjectDetail, withThemedBackground],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
    creator: {
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: "/woman.jpg",
    },
    status: {
      id: "pending",
      name: "Pending",
    },
    category: { id: 1, name: "Design" },
    customer: {
      id: 1,
      imageUrl: "/man.jpg",
      fullName: "John Doe",
    },
    company: {
      id: 1,
      name: "Doe Inc.",
    },
    comments: 5,
    showCheckbox: false,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;

export const WithoutCreatorImage = {
  args: {
    ...Default.args,
    creator: {
      ...Default.args.creator,
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithoutCustomer = {
  args: {
    ...Default.args,
    customer: undefined,
  },
} satisfies Story;

export const WithoutCustomerImage = {
  args: {
    ...Default.args,
    customer: {
      ...Default.args.customer,
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithoutCompany = {
  args: {
    ...Default.args,
    company: undefined,
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: {
      id: "active",
      name: "Active",
    },
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: {
      id: "completed",
      name: "Completed",
    },
  },
} satisfies Story;
