import { EditProjectForm } from "../../EditProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditProjectFormStory } from "../../EditProjectForm/__stories__";
import { ProjectCommentsModalStory } from "../../ProjectCommentsModal/__stories__";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";

const meta = {
  title: "components/projects/ProjectDetailActions",
  component: ProjectDetailActions,
  decorators: [withDeleteProjectModalProvider, withThemedBackground],
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
    deleteProject: () => ({ status: "success" }),
    commentsModal: <ProjectCommentsModal {...ProjectCommentsModalStory.args} />,
    editProjectFormContainer: (
      <EditProjectForm {...EditProjectFormStory.args} />
    ),
  },
} satisfies Story;
