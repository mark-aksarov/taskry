import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPage } from "./ProjectsPage";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { Default as ProjectListStory } from "@/components/projects/ProjectList/ProjectList.stories";
import { Default as ProjectGridStory } from "@/components/projects/ProjectGrid/ProjectGrid.stories";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { Default as NewProjectFormStory } from "@/components/projects/NewProjectForm/NewProjectForm.stories";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { Default as ProjectFiltersFormStory } from "@/components/projects/ProjectFiltersForm/ProjectFiltersForm.stories";
import { withProjectDetailCompact } from "@/components/projects/ProjectDetailCompactClientContainer/decorators";
import { withProjectComments } from "@/components/projects/ProjectCommentsClientContainer/decorators";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { Default as NewTaskFormStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import ProjectsPageLoading from "./loading";

const meta = {
  title: "components/pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withProjectDetailCompact,
    withProjectComments,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ProjectFiltersFormContainer: () => (
      <ProjectFiltersForm {...ProjectFiltersFormStory.args} />
    ),
    ProjectsServerContainer: () => (
      <ViewModeLayout
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
      />
    ),

    NewTaskFormContainer: () => <NewTaskForm {...NewTaskFormStory.args} />,
    NewProjectFormContainer: () => (
      <NewProjectForm {...NewProjectFormStory.args} />
    ),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
};

export const WithNoProjects: Story = {
  args: { ...Default.args },
  render: () => <ProjectsPageEmpty />,
};
