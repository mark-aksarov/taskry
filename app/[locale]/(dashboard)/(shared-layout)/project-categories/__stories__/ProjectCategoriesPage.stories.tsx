import { mocked } from "storybook/test";
import ProjectsPageLoading from "../loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchList } from "@/components/search/SearchList";
import { ProjectCategoriesPage } from "../ProjectCategoriesPage";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { ProjectCategoriesPageDecorator } from "./ProjectCategoriesPageDecorator";
import { ProjectCategoryList } from "@/components/projectCategory/ProjectCategoryList";
import { ProjectCategoryListStory } from "@/components/projectCategory/ProjectCategoryList/__stories__";

const meta = {
  title: "pages/ProjectCategoriesPage",
  component: ProjectCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    ProjectCategoriesPageDecorator,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/project-categories");
  },
} satisfies Meta<typeof ProjectCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    searchContainer: <SearchList {...SearchListStory.args} />,
    projectCategoriesContainer: (
      <ProjectCategoryList {...ProjectCategoryListStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectsPageLoading />,
} satisfies Story;

export const WithNoProjectCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
