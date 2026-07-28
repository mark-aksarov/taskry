import { mocked } from "storybook/test";
import AppTeamProfileLoading from "./loading";
import AppTeamProfileNotFound from "../not-found";
import { mockedUserDetail } from "@/mocks/users";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserDetailAlt } from "@/dashboard/users/UserDetailAlt";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";

const meta = {
  title: "pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/user-1`);
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
} satisfies Meta<typeof TeamProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: mockedUserDetail,
    showUserActions: true,
    userDetailContainer: <UserDetailAlt {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppTeamProfileLoading />,
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    userDetailContainer: (
      <UserDetailAlt
        id={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        email={mockedUserDetail.email}
      />
    ),
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive fullName={mockedUserDetail.fullName} />
    ),
  },
} satisfies Story;

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppTeamProfileNotFound />,
} satisfies Story;
