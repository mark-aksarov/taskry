import { fn } from "storybook/internal/test";
import { ProjectListItem } from "./ProjectListItem";
import { EditProjectForm } from "../EditProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCommentsModalTrigger } from "../ProjectCommentsModalTrigger";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as EditProjectFormStory } from "../EditProjectForm/EditProjectForm.stories";
import { Default as ProjectDetailModalStory } from "../ProjectDetailModal/ProjectDetailModal.stories";
import { Default as UserDetailModalStory } from "@/components/users/UserDetailModal/UserDetailModal.stories";
import { Default as ProjectDetailBottomSheetStory } from "../ProjectDetailBottomSheet/ProjectDetailBottomSheet.stories";

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
          projectCommentsContainer={<MockedCommentsContainer />}
          sendCommentAction={fn()}
          updateCommentAction={fn()}
        />
      }
      menuTrigger={
        <ProjectItemActionMenuTrigger
          projectId={args.id}
          projectTitle={args.title}
          projectStatus={args.status}
          deleteAction={fn()}
          updateStatusAction={fn()}
          editProjectFormContainer={
            <EditProjectForm {...EditProjectFormStory.args} />
          }
        />
      }
      projectDetailModal={
        <ProjectDetailModal {...ProjectDetailModalStory.args} />
      }
      projectDetailBottomSheet={
        <ProjectDetailBottomSheet {...ProjectDetailBottomSheetStory.args} />
      }
      userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
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
