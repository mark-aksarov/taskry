import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryGrid } from "../ProjectCategoryGrid";
import { ProjectCategoryGridExample } from "./ProjectCategoryGridExample";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryGrid",
  component: ProjectCategoryGrid,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteProjectCategoriesProvider>
          <Story />
        </DeleteProjectCategoriesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof ProjectCategoryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <ProjectCategoryGridExample />,
  },
} satisfies Story;
