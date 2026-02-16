import { UsersPage } from "./UsersPage";
import UsersPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserListStory } from "@/components/users/UserList/__stories__";
import { UserGridStory } from "@/components/users/UserGrid/__stories__";
import { UserFiltersFormStory } from "@/components/users/UserFiltersForm/__stories__";
import { withDeleteUserModalProvider } from "@/components/users/DeleteUserModal/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";
import { UserToolbarCreateNewMenuTriggerStory } from "@/components/users/UserToolbarCreateNewMenuTrigger/__stories__";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withDeleteUserModalProvider,
    withEntityPaginationProvider,
    withSelectedTasksProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const userToolbarCreateNewMenuTrigger = (
  <UserToolbarCreateNewMenuTrigger
    {...UserToolbarCreateNewMenuTriggerStory.args}
  />
);

export const Default = {
  args: {
    userToolbarFiltersModalTrigger: (
      <UserToolbarFiltersModalTrigger
        filtersFormContainer={
          <UserFiltersForm {...UserFiltersFormStory.args} />
        }
      />
    ),
    userToolbarCreateNewMenuTrigger: userToolbarCreateNewMenuTrigger,
    usersContainer: (
      <EntityContainerPresentation
        list={<UserList {...UserListStory.args} showCheckbox />}
        grid={<UserGrid {...UserGridStory.args} />}
        page={1}
        pageSize={3}
        totalPages={3}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
} satisfies Story;

export const WithNoUsers = {
  args: { ...Default.args },
  render: () => (
    <UsersPageEmpty
      userToolbarCreateNewMenuTrigger={userToolbarCreateNewMenuTrigger}
    />
  ),
} satisfies Story;
