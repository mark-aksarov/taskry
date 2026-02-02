import { UsersPage } from "./UsersPage";
import UsersPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewUserForm } from "@/components/users/NewUserForm";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { NewPositionForm } from "@/components/users/NewPositionForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserListStory } from "@/components/users/UserList/UserList.stories";
import { Default as UserGridStory } from "@/components/users/UserGrid/UserGrid.stories";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { Default as UserFormBaseStory } from "@/components/users/UserFormBase/UserFormBase.stories";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";
import { Default as UserFiltersFormStory } from "@/components/users/UserFiltersForm/UserFiltersForm.stories";
import { Default as PositionFormBaseStory } from "@/components/users/PositionFormBase/PositionFormBase.stories";

const meta = {
  title: "components/pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userToolbarFiltersModalTrigger: (
      <UserToolbarFiltersModalTrigger
        filtersFormContainer={
          <UserFiltersForm {...UserFiltersFormStory.args} />
        }
      />
    ),
    userToolbarActionsMenuTrigger: (
      <UserToolbarActionsMenuTrigger deleteAction={fn()} />
    ),
    userToolbarCreateNewMenuTrigger: (
      <UserToolbarCreateNewMenuTrigger
        showUserMenuItem
        guestMode={false}
        newUserFormContainer={<NewUserForm {...UserFormBaseStory.args} />}
        newPositionForm={<NewPositionForm {...PositionFormBaseStory.args} />}
      />
    ),
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
  render: () => <UsersPageEmpty />,
} satisfies Story;
