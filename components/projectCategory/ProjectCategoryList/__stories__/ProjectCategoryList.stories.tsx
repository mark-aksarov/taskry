import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryList } from "../ProjectCategoryList";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryListItemStory } from "../../ProjectCategoryListItem/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoryModalProvider } from "../../DeleteProjectCategoryModal/__stories__";

const mockedProjectCategories = [
  { id: 1, name: "Project Category 1" },
  { id: 2, name: "Project Category 2" },
  { id: 3, name: "Project Category 3" },
  { id: 4, name: "Project Category 4" },
  { id: 5, name: "Project Category 5" },
];

const meta = {
  title: "components/project-categories/ProjectCategoryList",
  component: ProjectCategoryList,
  decorators: [
    withSelectedItemsProvider,
    withDeleteProjectCategoryModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectCategories.map((projectCategory) => (
      <ProjectCategoryListItem
        {...ProjectCategoryListItemStory.args}
        key={projectCategory.id}
        {...projectCategory}
      />
    )),
  },
} satisfies Story;
