import { mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchList } from "@/components/search/SearchList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesContext/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateTaskCategoryProvider,
    withDeleteTaskCategoriesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedItemsProvider,
    PageDecorator,
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
