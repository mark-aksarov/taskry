import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { ProjectCategoryGrid } from "@/components/projectCategory/ProjectCategoryGrid";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { ProjectCategoryGridStory } from "@/components/projectCategory/ProjectCategoryGrid/__stories__";
import { withCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";
import { withDeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateProjectCategoryProvider,
    withDeleteProjectCategoriesProvider,
    withSelectedItemsProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    projectCategoriesContainer: (
      <ProjectCategoryGrid {...ProjectCategoryGridStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjectCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
