import { fn } from "storybook/internal/test";
import { ProjectListItem } from "./ProjectListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCommentsModalTrigger } from "../ProjectCommentsModalTrigger";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

const meta = {
  title: "Components/projects/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <ProjectListItem
      {...args}
      commentModalTrigger={
        <ProjectCommentsModalTrigger
          projectId={1}
          commentsCount={10}
          sendCommentAction={fn()}
        />
      }
      menuTrigger={
        <ProjectItemActionMenuTrigger
          projectId={args.id}
          projectTitle={args.title}
          projectStatus={args.status}
          deleteAction={fn()}
          updateStatusAction={fn()}
        />
      }
    />
  ),
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof ProjectListItem>;

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
    status: ProjectStatus.pending,
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
    showCheckbox: false,
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
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
