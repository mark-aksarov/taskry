import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [
    withUpdateProjectCategoryProvider,
    withDeleteProjectCategoryProvider,
    withDeleteProjectCategoriesProvider,
    withSessionProvider,
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
