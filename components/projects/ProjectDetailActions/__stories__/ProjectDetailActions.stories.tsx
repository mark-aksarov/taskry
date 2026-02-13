import { fn } from "storybook/internal/test";
import { EditProjectForm } from "../../EditProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditProjectFormStory } from "../../EditProjectForm/__stories__";
import { ProjectCommentsModalStory } from "../../ProjectCommentsModal/__stories__";

const meta = {
  title: "components/projects/ProjectDetailActions",
  component: ProjectDetailActions,
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
    commentsModal: <ProjectCommentsModal {...ProjectCommentsModalStory.args} />,
    editProjectFormContainer: (
      <EditProjectForm {...EditProjectFormStory.args} />
    ),
  },
} satisfies Story;
