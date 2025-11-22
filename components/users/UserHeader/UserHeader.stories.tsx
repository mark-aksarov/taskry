import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserHeader } from "./UserHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserHeader",
  component: UserHeader,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    fullName: "John Doe",
    imageUrl: "/man.jpg",
    position: {
      name: "Developer",
    },
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    fullName: "John Doe",
  },
} satisfies Story;
