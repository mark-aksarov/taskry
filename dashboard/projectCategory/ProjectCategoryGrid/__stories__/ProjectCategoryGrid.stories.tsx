import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryGrid } from "../ProjectCategoryGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryGridExample } from "./ProjectCategoryGridExample";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryGrid",
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
    children: <ProjectCategoryGridExample />,
  },
} satisfies Story;
