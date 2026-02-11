import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryItemActionMenuTrigger } from "../ProjectCategoryItemActionMenuTrigger";

const mockedProjectCategories = [
  { id: 6, name: "Web Development", workspaceId: 1 },
  { id: 7, name: "Mobile Applications", workspaceId: 1 },
  { id: 8, name: "Marketing", workspaceId: 1 },
  { id: 9, name: "Design", workspaceId: 1 },
  { id: 10, name: "Internal Systems", workspaceId: 1 },
];

const meta = {
  title: "components/project-categories/ProjectCategoryList",
  component: ProjectCategoryList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryList>;

export default meta;
type Story = StoryObj<typeof ProjectCategoryList>;

export const Default = {
  args: {
    children: mockedProjectCategories.map((projectCategory) => (
      <ProjectCategoryListItem
        key={projectCategory.id}
        id={projectCategory.id}
        name={projectCategory.name}
        menuTrigger={
          <ProjectCategoryItemActionMenuTrigger
            guestMode={false}
            projectId={projectCategory.id}
            projectCategoryName={projectCategory.name}
          />
        }
      />
    )),
  },
} satisfies Story;
