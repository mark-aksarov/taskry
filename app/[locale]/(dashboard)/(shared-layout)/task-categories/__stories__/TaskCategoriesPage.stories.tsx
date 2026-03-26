import { mocked } from "storybook/test";
import TasksPageLoading from "../loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoriesPage } from "../TaskCategoriesPage";
import { SearchList } from "@/components/search/SearchList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoriesPageDecorator } from "./TaskCategoriesPageDecorator";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    TaskCategoriesPageDecorator,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/task-categories");
  },
} satisfies Meta<typeof TaskCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    searchContainer: <SearchList {...SearchListStory.args} />,
    taskCategoriesContainer: (
      <TaskCategoryList {...TaskCategoryListStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
