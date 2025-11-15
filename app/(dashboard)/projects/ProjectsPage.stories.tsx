import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPage } from "./ProjectsPage";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { default as ProjectPageLoading } from "./loading";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { Default as ProjectListStory } from "@/components/projects/ProjectList/ProjectList.stories";
import { Default as ProjectGridStory } from "@/components/projects/ProjectGrid/ProjectGrid.stories";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { Default as NewProjectFormStory } from "@/components/projects/NewProjectForm/NewProjectForm.stories";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { Default as ProjectFiltersFormStory } from "@/components/projects/ProjectFiltersForm/ProjectFiltersForm.stories";

const meta = {
  title: "components/pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
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
    ProjectViewModeContainer: () => (
      <ViewModeContainer
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
      />
    ),
    NewProjectFormContainer: () => (
      <NewProjectForm {...NewProjectFormStory.args} />
    ),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <ProjectPageLoading />,
};

export const WithNoProjects: Story = {
  args: { ...Default.args },
  render: () => <ProjectsPageEmpty />,
};
