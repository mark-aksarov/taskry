import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileCard } from "./ProfileCard";
import { ProfileCardLeft } from "./ProfileCardLeft";
import { ProfileCardHeader } from "./ProfileCardHeader";
import { ProfileCardTitle } from "./ProfileCardTitle";
import { ProfileCardRight } from "./ProfileCardRight";
import { withBackgroundVariant } from "@/.storybook/decorators";

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
          <div className="p-6">
            <span className="text-black dark:text-white">Content Left</span>
          </div>
        </ProfileCardLeft>
        <ProfileCardRight>
          <span className="text-black dark:text-white">Content Right</span>
        </ProfileCardRight>
      </>
    ),
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
