import { ProjectListItem } from "./ProjectListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectComments } from "../ProjectCommentsClientContainer/decorators";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { withProjectDetailCompact } from "../ProjectDetailCompactClientContainer/decorators";

const meta = {
  title: "Components/projects/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [
    withProjectDetailCompact,
    withProjectComments,
    withUserDetail,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedAction = () => {
  return new Promise(() => ({
    status: "success",
    message: null,
  })) as any;
};

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
    deleteAction: mockedAction,
    updateStatusAction: mockedAction,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    creator: undefined,
    customer: undefined,
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
