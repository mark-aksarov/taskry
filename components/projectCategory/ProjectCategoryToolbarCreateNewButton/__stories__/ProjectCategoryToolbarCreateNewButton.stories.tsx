import { Meta, StoryObj } from "@storybook/react";
import { NewProjectCategoryForm } from "../../NewProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewProjectCategoryFormStory } from "../../NewProjectCategoryForm/__stories__";
import { ProjectCategoryToolbarCreateNewButton } from "../ProjectCategoryToolbarCreateNewButton";

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
