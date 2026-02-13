import { NewProjectForm } from "../NewProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategorySelect } from "../../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../../ProjectCustomerSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategorySelectStory } from "../../ProjectCategorySelect/__stories__";
import { ProjectCustomerSelectStory } from "../../ProjectCustomerSelect/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/projects/NewProjectForm",
  component: NewProjectForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategorySelect: (
      <ProjectCategorySelect {...ProjectCategorySelectStory.args} />
    ),
    projectCustomerSelect: (
      <ProjectCustomerSelect {...ProjectCustomerSelectStory.args} />
    ),
    createProject: () => ({ status: "success" }),
  },
} satisfies Story;
