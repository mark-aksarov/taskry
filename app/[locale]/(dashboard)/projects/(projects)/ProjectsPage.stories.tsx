import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import ProjectsTemplate from "./ProjectsTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectGridStory } from "@/components/projects/ProjectGrid/__stories__";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { ProjectFiltersFormStory } from "@/components/projects/ProjectFiltersForm/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withDeleteProjectModalProvider } from "@/components/projects/DeleteProjectModal/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";
import { withSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";
import { withUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusContext/__stories__";
import { ProjectToolbarActionsMenuTriggerStory } from "@/components/projects/ProjectToolbarActionsMenuTrigger/__stories__";
import { ProjectToolbarCreateNewMenuTriggerStory } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger/__stories__";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <ProjectsTemplate {...AppHeaderStory.args}>
        <Story />
      </ProjectsTemplate>
    ),
    withDeleteProjectModalProvider,
    withEntityPaginationProvider,
    withSelectedProjectsProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const projectToolbarCreateNewMenuTrigger = (
  <ProjectToolbarCreateNewMenuTrigger
    {...ProjectToolbarCreateNewMenuTriggerStory.args}
  />
);

export const Default = {
  args: {
    projectsContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
        totalPages={3}
      />
    ),
    projectToolbarCreateNewMenuTrigger: projectToolbarCreateNewMenuTrigger,
    projectToolbarFiltersModalTrigger: (
      <ProjectToolbarFiltersModalTrigger
        filtersFormContainer={
          <ProjectFiltersForm {...ProjectFiltersFormStory.args} />
        }
      />
    ),
    projectToolbarActionsMenuTrigger: (
      <ProjectToolbarActionsMenuTrigger
        {...ProjectToolbarActionsMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjects = {
  args: { ...Default.args },
  render: () => (
    <ProjectsPageEmpty
      projectToolbarCreateNewMenuTrigger={projectToolbarCreateNewMenuTrigger}
    />
  ),
} satisfies Story;
