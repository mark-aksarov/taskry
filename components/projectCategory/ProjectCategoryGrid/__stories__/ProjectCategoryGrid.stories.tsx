import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryGrid } from "../ProjectCategoryGrid";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { ProjectCategoryListItemStory } from "../../ProjectCategoryListItem/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryGrid",
  component: ProjectCategoryGrid,
  decorators: [
    withDeleteProjectCategoriesProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectCategorySummaries.map((projectCategory) => (
      <MockedUpdateProjectCategoryProvider key={projectCategory.id}>
        <MockedDeleteProjectCategoryProvider>
          <ProjectCategoryListItem
            {...ProjectCategoryListItemStory.args}
            {...projectCategory}
          />
        </MockedDeleteProjectCategoryProvider>
      </MockedUpdateProjectCategoryProvider>
    )),
  },
} satisfies Story;
