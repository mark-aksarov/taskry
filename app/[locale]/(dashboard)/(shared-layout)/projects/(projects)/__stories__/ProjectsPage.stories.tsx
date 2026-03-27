import {
  ProjectGridLarge,
  ProjectGridMobile,
} from "@/components/projects/ProjectGrid";

import {
  ProjectGridLargeStory,
  ProjectGridMobileStory,
} from "@/components/projects/ProjectGrid/__stories__";

import { mocked } from "storybook/test";
import ProjectsPageLoading from "../loading";
import { ProjectsPage } from "../ProjectsPage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectList } from "@/components/projects/ProjectList";
import { withProjectsPageModals } from "./withProjectsPageModals";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withProjectsPageProviders } from "./withProjectsPageProviders";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectListStory } from "@/components/projects/ProjectList/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

const meta = {
  title: "pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withProjectsPageModals,
    withProjectsPageProviders,
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
