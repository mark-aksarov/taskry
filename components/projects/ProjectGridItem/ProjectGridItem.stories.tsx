import { fn } from "storybook/test";
import { ProjectGridItem } from "./ProjectGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCommentsModalTrigger } from "../ProjectCommentsModalTrigger";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

const meta = {
  title: "Components/projects/ProjectGridItem",
  component: ProjectGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],

  render: (args) => (
    <ProjectGridItem
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
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof ProjectGridItem>;

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
    status: "pending",
    tasksTotal: 10,
    tasksCompleted: 8,
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
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: undefined,
    },
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
