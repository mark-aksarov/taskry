import { Meta, StoryObj } from "@storybook/react";
import { NewProjectCategoryForm } from "../../NewProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryToolbarCreateNewButton } from "../ProjectCategoryToolbarCreateNewButton";
import { Default as NewProjectCategoryFormStory } from "../../NewProjectCategoryForm/NewProjectCategoryForm.stories";

const meta = {
  title: "components/project-categories/ProjectCategoryToolbarCreateNewButton",
  component: ProjectCategoryToolbarCreateNewButton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryToolbarCreateNewButton>;

export default meta;
type Story = StoryObj<typeof ProjectCategoryToolbarCreateNewButton>;

export const Default = {
  args: {
    guestMode: false,
    newProjectCategoryForm: (
      <NewProjectCategoryForm {...NewProjectCategoryFormStory.args} />
    ),
  },
} satisfies Story;
