import { Meta, StoryObj } from "@storybook/react";
import { NewProjectCategoryForm } from "../../NewProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewProjectCategoryFormStory } from "../../NewProjectCategoryForm/__stories__";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "../ProjectCategoryToolbarCreateNewModalTrigger";

const meta = {
  title:
    "components/project-categories/ProjectCategoryToolbarCreateNewModalTrigger",
  component: ProjectCategoryToolbarCreateNewModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryToolbarCreateNewModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newProjectCategoryForm: (
      <NewProjectCategoryForm {...NewProjectCategoryFormStory.args} />
    ),
  },
} satisfies Story;
