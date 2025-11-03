import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardLeft } from "./ProfileCardLeft";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardTitle } from "./ProfileCardTitle";
import { ProfileCardRight } from "./ProfileCardRight";

const meta = {
  title: "components/profile/ProfileCard",
  component: ProfileCard,
  args: {
    children: (
      <>
        <ProfileCardLeft>
          <ProfileCardHeader>
            <ProfileCardTitle>Title</ProfileCardTitle>
          </ProfileCardHeader>
          <div className="p-6">Content Left</div>
        </ProfileCardLeft>
        <ProfileCardRight>Content Right</ProfileCardRight>
      </>
    ),
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
