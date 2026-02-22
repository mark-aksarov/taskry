import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import ProjectCategoriesTemplate from "./ProjectCategoriesTemplate";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoriesPageEmpty } from "./ProjectCategoriesPageEmpty";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { ProjectCategoryList } from "@/components/projectCategory/ProjectCategoryList";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { ProjectCategoryListStory } from "@/components/projectCategory/ProjectCategoryList/__stories__";
import { withDeleteProjectCategoryModalProvider } from "@/components/projectCategory/DeleteProjectCategoryModal/__stories__";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";
import { ProjectCategoryToolbarActionsMenuTriggerStory } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger/__stories__";
import { ProjectCategoryToolbarCreateNewModalTriggerStory } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger/__stories__";

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
    withDeleteProjectCategoryModalProvider,
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

const projectCategoryToolbarCreateNewModalTrigger = (
  <ProjectCategoryToolbarCreateNewModalTrigger
    {...ProjectCategoryToolbarCreateNewModalTriggerStory.args}
  />
);

export const Default = {
  args: {
    projectCategoriesContainer: (
      <ProjectCategoryList {...ProjectCategoryListStory.args} />
    ),
    projectCategoryToolbarCreateNewModalTrigger:
      projectCategoryToolbarCreateNewModalTrigger,
    projectCategoryToolbarActionsMenuTrigger: (
      <ProjectCategoryToolbarActionsMenuTrigger
        {...ProjectCategoryToolbarActionsMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjectCategories = {
  args: { ...Default.args },
  render: () => (
    <ProjectCategoriesPageEmpty
      projectCategoryToolbarCreateNewModalTrigger={
        projectCategoryToolbarCreateNewModalTrigger
      }
    />
  ),
} satisfies Story;
