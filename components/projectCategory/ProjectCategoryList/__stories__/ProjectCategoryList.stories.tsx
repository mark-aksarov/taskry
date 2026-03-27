import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryList } from "../ProjectCategoryList";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { UpdateProjectCategoryModal } from "../../UpdateProjectCategoryModal";
import { DeleteProjectCategoryModal } from "../../DeleteProjectCategoryModal";
import { ProjectCategoryListItemStory } from "../../ProjectCategoryListItem/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { MockedProjectCategoryProviders } from "../../ProjectCategoryProviders/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryList",
  component: ProjectCategoryList,
  decorators: [
    withDeleteProjectCategoriesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectCategorySummaries.map((projectCategory) => (
      <MockedProjectCategoryProviders key={projectCategory.id}>
        <ProjectCategoryListItem
          {...ProjectCategoryListItemStory.args}
          {...projectCategory}
        />

        <UpdateProjectCategoryModal
          projectCategoryId={projectCategory.id}
          projectCategoryName={projectCategory.name}
        />
        <DeleteProjectCategoryModal
          projectCategoryId={projectCategory.id}
          projectCategoryName={projectCategory.name}
        />
      </MockedProjectCategoryProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
