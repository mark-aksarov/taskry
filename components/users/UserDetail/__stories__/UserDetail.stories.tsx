import { UserDetail } from "../UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const mockedUser = {
  id: "user1",
  fullName: "User 1",
  email: "user1@example.com",
  phoneNumber: "+10000000001",
  publicLink: "https://example.com/user1",
  position: {
    name: "Position 1",
  },
  bio: "Sample bio text. Placeholder content only. No specific details provided.",
  birthdate: new Date(1990, 0, 1),
  address: "Address line 1",
};

const meta = {
  title: "components/users/UserDetail",
  component: UserDetail,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUser,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    id: "user-1",
    fullName: "User 1",
    email: "user-1@example.com",
  },
} satisfies Story;
