import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserCard } from "./UserCard";
import { UserCardLeft } from "./UserCardLeft";
import { UserCardHeader } from "./UserCardHeader";
import { UserCardTitle } from "./UserCardTitle";
import { UserCardRight } from "./UserCardRight";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserCard",
  component: UserCard,
  args: {
    children: (
      <>
        <UserCardLeft>
          <UserCardHeader>
            <UserCardTitle>Title</UserCardTitle>
          </UserCardHeader>
          <div className="p-6">
            <span className="text-black dark:text-white">Content Left</span>
          </div>
        </UserCardLeft>
        <UserCardRight>
          <span className="text-black dark:text-white">Content Right</span>
        </UserCardRight>
      </>
    ),
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
