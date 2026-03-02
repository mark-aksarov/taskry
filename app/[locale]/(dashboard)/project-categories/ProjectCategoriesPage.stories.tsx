import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import ProjectCategoriesTemplate from "./ProjectCategoriesTemplate";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { ProjectCategoryList } from "@/components/projectCategory/ProjectCategoryList";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { ProjectCategoryListStory } from "@/components/projectCategory/ProjectCategoryList/__stories__";

const meta = {
  title: "pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <ProjectCategoriesTemplate {...AppHeaderStory.args}>
        <Story />
      </ProjectCategoriesTemplate>
    ),
    withPageTransitionProvider,
    withSelectedItemsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    projectCategoriesContainer: (
      <ProjectCategoryList {...ProjectCategoryListStory.args} />
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
