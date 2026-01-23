import { fn, mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFormBase } from "@/components/projects/ProjectFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectCategoryFormBase } from "@/components/projects/ProjectCategoryFormBase";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { Default as ProjectListStory } from "@/components/projects/ProjectList/ProjectList.stories";
import { Default as ProjectGridStory } from "@/components/projects/ProjectGrid/ProjectGrid.stories";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";
import { Default as ProjectFormBaseStory } from "@/components/projects/ProjectFormBase/ProjectFormBase.stories";
import { Default as ProjectFiltersFormStory } from "@/components/projects/ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "components/pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    projectToolbarCreateNewMenuTrigger: (
      <ProjectToolbarCreateNewMenuTrigger
        newProjectFormContainer={
          <ProjectFormBase {...ProjectFormBaseStory.args} />
        }
        newProjectCategoryForm={<ProjectCategoryFormBase formAction={fn()} />}
      />
    ),
    projectToolbarFiltersModalTrigger: (
      <ProjectToolbarFiltersModalTrigger
        filtersFormContainer={
          <ProjectFiltersForm {...ProjectFiltersFormStory.args} />
        }
      />
    ),
    projectToolbarActionsMenuTrigger: (
      <ProjectToolbarActionsMenuTrigger
        deleteAction={fn()}
        updateStatusAction={fn()}
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
      newProjectFormContainer={
        <ProjectFormBase {...ProjectFormBaseStory.args} />
      }
    />
  ),
} satisfies Story;
