import { Meta, StoryObj } from "@storybook/react";
import { EditProjectCategoryForm } from "../../EditProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditProjectCategoryFormStory } from "../../EditProjectCategoryForm/__stories__";
import { ProjectCategoryItemActionMenuTrigger } from "../ProjectCategoryItemActionMenuTrigger";

const meta = {
  title: "components/project-categories/ProjectCategoryItemActionMenuTrigger",
  component: ProjectCategoryItemActionMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryItemActionMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    projectCategoryId: 1,
    projectCategoryName: "Web Development",
    editProjectCategoryForm: (
      <EditProjectCategoryForm {...EditProjectCategoryFormStory.args} />
    ),
    deleteProjectCategories: () => ({ status: "success" }),
  },
} satisfies Story;
