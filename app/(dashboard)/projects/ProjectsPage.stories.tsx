import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPage } from "./ProjectsPage";
import { ProjectCategoryCheckboxGroup } from "@/components/projects/ProjectCategoryCheckboxGroup";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { PageDecorator, withBackgroundVariant } from "@/.storybook/decorators";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { default as ProjectPageLoading } from "./loading";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { Default as CustomerCheckboxGroupStory } from "@/components/customer/CustomerCheckboxGroup/CustomerCheckboxGroup.stories";
import { Default as ProjectCategoryCheckboxGroupStory } from "@/components/projects/ProjectCategoryCheckboxGroup/ProjectCategoryCheckboxGroup.stories";
import { Default as ProjectListStory } from "@/components/projects/ProjectList/ProjectList.stories";
import { Default as ProjectGridStory } from "@/components/projects/ProjectGrid/ProjectGrid.stories";
import { Default as UserCheckboxGroupStory } from "@/components/users/UserCheckboxGroup/UserCheckboxGroup.stories";

const meta = {
  title: "components/pages/ProjectsPage",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withBackgroundVariant()],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ProjectCategoryCheckboxGroupContainer: () => (
      <ProjectCategoryCheckboxGroup
        {...ProjectCategoryCheckboxGroupStory.args}
      />
    ),
    CustomerCheckboxGroupContainer: () => (
      <CustomerCheckboxGroup {...CustomerCheckboxGroupStory.args} />
    ),
    UserCheckboxGroupContainer: () => (
      <UserCheckboxGroup {...UserCheckboxGroupStory.args} />
    ),
    ProjectViewModeContainer: () => (
      <ViewModeContainer
        list={<ProjectList {...ProjectListStory.args} />}
        grid={<ProjectGrid {...ProjectGridStory.args} />}
      />
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
