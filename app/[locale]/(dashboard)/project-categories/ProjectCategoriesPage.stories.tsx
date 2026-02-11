import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoriesPageEmpty } from "./ProjectCategoriesPageEmpty";
import { ProjectCategoryList } from "@/components/projectCategory/ProjectCategoryList";
import { ProjectCategoryToolbarCreateNewButton } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewButton";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { Default as ProjectCategoryListStory } from "@/components/projectCategory/ProjectCategoryList/ProjectCategoryList.stories";
import { ProjectCategoryToolbarCreateNewButtonStory } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewButton/__stories__";
import { ProjectCategoryToolbarActionsMenuTriggerStory } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "components/pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const projectCategoryToolbarCreateNewButton = (
  <ProjectCategoryToolbarCreateNewButton
    {...ProjectCategoryToolbarCreateNewButtonStory.args}
  />
);

export const Default = {
  args: {
    projectCategoriesContainer: (
      <ProjectCategoryList {...ProjectCategoryListStory.args} />
    ),
    projectCategoryToolbarCreateNewButton:
      projectCategoryToolbarCreateNewButton,
    projectToolbarActionsMenuTrigger: (
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
      projectCategoryToolbarCreateNewButton={
        projectCategoryToolbarCreateNewButton
      }
    />
  ),
} satisfies Story;
