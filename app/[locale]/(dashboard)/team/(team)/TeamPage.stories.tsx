import { TeamPage } from "./TeamPage";
import { mocked } from "storybook/test";
import TeamPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridExample } from "@/dashboard/users/UserGrid/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withUserSearchModal } from "@/dashboard/users/UserSearchModal/__stories__";
import { withCreateUserProvider } from "@/dashboard/users/CreateUserProvider/__stories__";
import { withUserFiltersProvider } from "@/dashboard/users/UserFiltersContext/__stories__";
import { withCreatePositionProvider } from "@/dashboard/position/CreatePositionProvider/__stories__";

const meta = {
  title: "pages/TeamPage",
  component: TeamPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUserSearchModal,
    withUserFiltersProvider,
    withCreatePositionProvider,
    withCreateUserProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof TeamPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 1,
    positionCount: 3,
    totalFilteredUsers: 3,
    selectedSortField: "fullName",
    userGrid: <UserGridExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TeamPageLoading />,
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredUsers: 0 },
} satisfies Story;
