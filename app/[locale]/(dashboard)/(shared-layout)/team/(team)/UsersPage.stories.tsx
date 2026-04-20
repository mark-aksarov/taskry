import { UsersPage } from "./UsersPage";
import { mocked } from "storybook/test";
import UsersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserSearchModal } from "@/dashboard/users/UserSearchModal/__stories__";
import { withCreateUserProvider } from "@/dashboard/users/CreateUserProvider/__stories__";
import { withUserFiltersProvider } from "@/dashboard/users/UserFiltersContext/__stories__";
import { UsersContainerPresentationExample } from "@/dashboard/users/UsersContainer/__stories__";
import { withCreatePositionProvider } from "@/dashboard/position/CreatePositionProvider/__stories__";

const meta = {
  title: "pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUserSearchModal,
    withUserFiltersProvider,
    withCreatePositionProvider,
    withCreateUserProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalFilteredUsers: 3,
    selectedSortField: "fullName",
    usersContainer: <UsersContainerPresentationExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredUsers: 0 },
} satisfies Story;
