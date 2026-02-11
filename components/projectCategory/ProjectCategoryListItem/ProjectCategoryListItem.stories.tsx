import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryItemActionMenuTrigger } from "../ProjectCategoryItemActionMenuTrigger";

const meta = {
  title: "components/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryListItem>;

export default meta;
type Story = StoryObj<typeof ProjectCategoryListItem>;

export const Default = {
  args: {
    id: 1,
    name: "Web Development",
    menuTrigger: (
      <ProjectCategoryItemActionMenuTrigger
        guestMode={false}
        projectId={1}
        projectCategoryName="Web Development"
      />
    ),
  },
} satisfies Story;
