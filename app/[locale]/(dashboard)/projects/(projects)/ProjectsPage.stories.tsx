import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import ProjectsTemplate from "./ProjectsTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectsPageEmptyContainer } from "./ProjectsPageEmptyContainer";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectGridStory } from "@/components/projects/ProjectGrid/__stories__";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { newProjectFormArgs } from "@/components/projects/NewProjectForm/__stories__";
import { projectFiltersFormArgs } from "@/components/projects/ProjectFiltersForm/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withDeleteProjectModalProvider } from "@/components/projects/DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusContext/__stories__";

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
    PageDecorator,
    withProjectFiltersProvider,
    withDeleteProjectModalProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    totalFilteredProjects: 10,
    selectedSortField: "createdAt",

    newProjectFormContainer: <NewProjectForm {...newProjectFormArgs} />,
    projectFiltersFormContainer: (
      <ProjectFiltersForm {...projectFiltersFormArgs} />
    ),
    projectsContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
        totalPages={3}
      />
    ),

    createProjectCategory: () => ({ status: "success" }),
    deleteProjects: () => ({ status: "success" }),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjects = {
  args: { ...Default.args },
  render: () => (
    <ProjectsPageEmptyContainer
      guestMode={false}
      newProjectFormContainer={<NewProjectForm {...newProjectFormArgs} />}
      createProjectCategory={() => ({ status: "success" })}
    />
  ),
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredProjects: 0 },
} satisfies Story;
