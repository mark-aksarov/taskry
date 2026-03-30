import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { UpdateUserForm } from "@/components/users/UpdateUserForm";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext/__stories__";

const meta = {
  title: "pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withChangePasswordProvider,
    withUpdateUserProvider,
    withDeleteUserProvider,
    withUpdateUserImageProvider,
    withClearUserImageUrlProvider,
    withUpdateUserImageFileProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
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
    userId: mockedUserDetail.id,
    userFullName: mockedUserDetail.fullName,
    showUserActions: true,
    searchContainer: <SearchList {...SearchListStory.args} />,
    updateUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    userDetailContainer: <UserDetailSkeleton />,
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive fullName={mockedUserDetail.fullName} />
    ),
  },
} satisfies Story;
