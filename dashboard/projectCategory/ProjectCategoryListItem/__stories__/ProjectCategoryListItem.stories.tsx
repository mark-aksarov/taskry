import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { UpdateProjectCategoryProvider } from "../../UpdateProjectCategoryContext";
import { DeleteProjectCategoryProvider } from "../../DeleteProjectCategoryContext";
import { DeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <UpdateProjectCategoryProvider>
          <DeleteProjectCategoryProvider>
            <DeleteProjectCategoriesProvider>
              <Story />
            </DeleteProjectCategoriesProvider>
          </DeleteProjectCategoryProvider>
        </UpdateProjectCategoryProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
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
