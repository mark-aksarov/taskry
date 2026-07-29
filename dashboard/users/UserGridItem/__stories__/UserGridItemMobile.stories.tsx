import { mockedUserDetail } from "@/mocks/users";
import { UserGridItemMobile } from "../UserGridItemMobile";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteUserProvider } from "../../DeleteUserContext";
import { UpdateUserProvider } from "../../UpdateUserContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserGridItemMobile",
  component: UserGridItemMobile,
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <UpdateUserProvider>
          <DeleteUserProvider>
            <Story />
          </DeleteUserProvider>
        </UpdateUserProvider>
      </ViewModeProvider>
    ),
    withDashboardLayoutProviders,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof UserGridItemMobile>;

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
