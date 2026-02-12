import { UserDetail } from "./UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

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
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    phoneNumber: "+380990000001",
    publicLink: "https://example.com/user1",
    position: {
      name: "Developer",
    },
    bio: "John is a senior developer with over 10 years of experience in full-stack development. He enjoys mentoring junior developers, exploring new technologies, and contributing to open-source projects. In his free time, he loves hiking, reading sci-fi novels, and experimenting with creative coding projects.",
    birthdate: new Date(1985, 4, 15),
    address: "123 Main St, San Francisco, CA, USA",
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
  },
} satisfies Story;
