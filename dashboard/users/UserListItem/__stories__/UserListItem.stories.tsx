import { UserListItem } from "../UserListItem";
import { mockedUserDetail } from "@/mocks/users";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { withUpdateUserProvider } from "../../UpdateUserProvider/__stories__";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/users/UserListItem",
  component: UserListItem,
  decorators: [
    withUpdateUserProvider,
    withDeleteUserProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    fullName: "This is a user name with a very long text for layout testing",
    email: "longemailaddressfortestingpurposes@exampledomainfortestemail.com",
    phoneNumber: "+1000000000000000000000000000000000000000000000000000",
    publicLink:
      "https://example.com/this-is-a-very-long-url-for-layout-testing",
  },
};

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
