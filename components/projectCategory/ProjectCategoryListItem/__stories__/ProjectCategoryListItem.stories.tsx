import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [
    withUpdateProjectCategoryProvider,
    withDeleteProjectCategoryProvider,
    withDeleteProjectCategoriesProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Project Category 1",
  },
} satisfies Story;
