import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryItemActionMenuTrigger } from "../../ProjectCategoryItemActionMenuTrigger";
import { ProjectCategoryItemActionMenuTriggerStory } from "../../ProjectCategoryItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryListItem>;

export default meta;
type Story = StoryObj<typeof ProjectCategoryListItem>;

export const Default = {
  args: {
    id: 1,
    name: "Project Category 1",
    menuTrigger: (
      <ProjectCategoryItemActionMenuTrigger
        {...ProjectCategoryItemActionMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;
