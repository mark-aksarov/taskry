import { NewProjectForm } from "../../NewProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectFormStory } from "../../NewProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarCreateNewMenuTrigger } from "../ProjectToolbarCreateNewMenuTrigger";
import { NewProjectCategoryForm } from "@/components/projectCategory/NewProjectCategoryForm";
import { NewProjectCategoryFormStory } from "@/components/projectCategory/NewProjectCategoryForm/__stories__";

const meta = {
  title: "components/projects/ProjectToolbarCreateNewMenuTrigger",
  component: ProjectToolbarCreateNewMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectToolbarCreateNewMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newProjectFormContainer: <NewProjectForm {...NewProjectFormStory.args} />,
    newProjectCategoryForm: (
      <NewProjectCategoryForm {...NewProjectCategoryFormStory.args} />
    ),
  },
} satisfies Story;
