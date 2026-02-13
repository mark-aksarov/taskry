import { EditProjectForm } from "../EditProjectForm";
import { parseDate } from "@internationalized/date";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectCategorySelect } from "../../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../../ProjectCustomerSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategorySelectStory } from "../../ProjectCategorySelect/__stories__";
import { ProjectCustomerSelectStory } from "../../ProjectCustomerSelect/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/projects/EditProjectForm",
  component: EditProjectForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectTitleDefaultValue: "Project 1",
    projectDescriptionDefaultValue:
      "Project description. General information goes here.",
    projectDeadlineDefaultValue: parseDate("2025-12-01"),
    projectStatusDefaultValue: ProjectStatus.pending,
    projectCategorySelect: (
      <ProjectCategorySelect {...ProjectCategorySelectStory.args} />
    ),
    projectCustomerSelect: (
      <ProjectCustomerSelect {...ProjectCustomerSelectStory.args} />
    ),
    updateProject: () => ({ status: "success" }),
  },
} satisfies Story;
