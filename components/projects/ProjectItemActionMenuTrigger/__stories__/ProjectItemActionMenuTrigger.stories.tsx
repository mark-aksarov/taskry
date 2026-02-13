import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditProjectForm } from "../../EditProjectForm";
import { ProjectStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditProjectFormStory } from "../../EditProjectForm/__stories__";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

const meta = {
  title: "components/projects/ProjectItemActionMenuTrigger",
  component: ProjectItemActionMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    projectId: 1,
    projectTitle: "Project 1",
    projectStatus: ProjectStatus.pending,
    deleteAction: () => ({ status: "success" }),
    updateStatusAction: () => ({ status: "success" }),
    editProjectFormContainer: (
      <EditProjectForm {...EditProjectFormStory.args} />
    ),
  },
} satisfies Story;
