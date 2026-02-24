import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryList } from "../ProjectCategoryList";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { ProjectCategoryListItemStory } from "../../ProjectCategoryListItem/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoryModalProvider } from "../../DeleteProjectCategoryModal/__stories__";

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
    children: mockedProjectCategorySummaries.map((projectCategory) => (
      <ProjectCategoryListItem
        key={projectCategory.id}
        {...ProjectCategoryListItemStory.args}
        {...projectCategory}
      />
    )),
  },
} satisfies Story;
