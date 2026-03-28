import {
  ProjectGridLarge,
  ProjectGridMobile,
} from "@/components/projects/ProjectGrid";

import {
  ProjectGridLargeStory,
  ProjectGridMobileStory,
} from "@/components/projects/ProjectGrid/__stories__";

import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectList } from "@/components/projects/ProjectList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { withProjectSearchModal } from "@/components/projects/ProjectSearchModal/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withCreateProjectProvider } from "@/components/projects/CreateProjectProvider/__stories__";
import { withProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext/__stories__";
import { withDeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider/__stories__";
import { withCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withProjectSearchModal,
    withProjectFiltersProvider,
    withCreateProjectCategoryProvider,
    withCreateProjectProvider,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withSelectedProjectsProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    totalFilteredProjects: 10,
    selectedSortField: "createdAt",
    projectsContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        listLarge={() => <ProjectList {...ProjectListStory.args} />}
        gridLarge={() => <ProjectGridLarge {...ProjectGridLargeStory.args} />}
        gridMobile={() => (
          <ProjectGridMobile {...ProjectGridMobileStory.args} />
        )}
        totalPages={3}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjects = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredProjects: 0 },
} satisfies Story;
