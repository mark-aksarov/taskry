import { fn } from "storybook/internal/test";
import { EditProjectForm } from "../EditProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Default as EditProjectFormStory } from "../EditProjectForm/EditProjectForm.stories";

const meta = {
  title: "components/users/ProjectDetailActions",
  component: ProjectDetailActions,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    projectId: 1,
    projectTitle: "Website Redesign",
    deleteProject: fn(),
    commentsModal: (
      <ProjectCommentsModal
        projectId={1}
        projectCommentsContainer={<MockedCommentsContainer />}
        sendCommentAction={fn()}
        updateCommentAction={fn()}
      />
    ),
    editProjectFormContainer: (
      <EditProjectForm {...EditProjectFormStory.args} />
    ),
  },
} satisfies Story;
