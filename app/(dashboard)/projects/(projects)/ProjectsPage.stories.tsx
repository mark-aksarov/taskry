import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { Default as NewTaskFormStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as ProjectListStory } from "@/components/projects/ProjectList/ProjectList.stories";
import { Default as ProjectGridStory } from "@/components/projects/ProjectGrid/ProjectGrid.stories";
import { withProjectComments } from "@/components/projects/ProjectCommentsClientContainer/decorators";
import { Default as NewProjectFormStory } from "@/components/projects/NewProjectForm/NewProjectForm.stories";
import { withProjectDetailCompact } from "@/components/projects/ProjectDetailCompactClientContainer/decorators";
import { Default as ProjectFiltersFormStory } from "@/components/projects/ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "components/pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withProjectDetailCompact,
    withProjectComments,
    withUserDetail,
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
