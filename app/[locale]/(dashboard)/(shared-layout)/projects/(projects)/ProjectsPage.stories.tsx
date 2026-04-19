import {
  ProjectGridItemLarge,
  ProjectGridItemMobile,
} from "@/components/projects/ProjectGridItem";

import {
  ProjectGridItemLargeStory,
  ProjectGridItemMobileStory,
} from "@/components/projects/ProjectGridItem/__stories__";

import { mocked } from "storybook/test";
import ProjectsPageLoading from "./loading";
import { ProjectsPage } from "./ProjectsPage";
import { usePathname } from "next/navigation";
import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { ProjectListItem } from "@/components/projects/ProjectListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectListItemStory } from "@/components/projects/ProjectListItem/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withProjectSearchModal } from "@/components/projects/ProjectSearchModal/__stories__";
import { withCreateProjectProvider } from "@/components/projects/CreateProjectProvider/__stories__";
import { withProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext/__stories__";
import { withDeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider/__stories__";
import { withCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectProvider } from "@/components/projects/DeleteProjectProvider/__stories__";
import { MockedUpdateProjectProvider } from "@/components/projects/UpdateProjectProvider/__stories__";
import { MockedUpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider/__stories__";

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
      <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
        {mockedProjectList.map((project) => (
          <MockedDeleteProjectProvider key={project.id}>
            <MockedUpdateProjectProvider>
              <MockedUpdateProjectStatusProvider>
                <ProjectListItem {...ProjectListItemStory.args} {...project} />
                <ProjectGridItemMobile
                  {...ProjectGridItemMobileStory.args}
                  {...project}
                />
                <ProjectGridItemLarge
                  {...ProjectGridItemLargeStory.args}
                  {...project}
                />
              </MockedUpdateProjectStatusProvider>
            </MockedUpdateProjectProvider>
          </MockedDeleteProjectProvider>
        ))}
      </EntityContainerPresentation>
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
