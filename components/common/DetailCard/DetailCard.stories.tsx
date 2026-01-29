import { DetailCard } from "./DetailCard";
import { DetailCardLeft } from "./DetailCardLeft";
import { DetailCardTitle } from "./DetailCardTitle";
import { DetailCardRight } from "./DetailCardRight";
import { DetailCardHeader } from "./DetailCardHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/DetailCard",
  component: DetailCard,
  args: {
    children: (
      <>
        <DetailCardLeft>
          <DetailCardHeader>
            <DetailCardTitle>Title</DetailCardTitle>
          </DetailCardHeader>
          <div className="p-6">
            <span className="text-black dark:text-white">Content Left</span>
          </div>
        </DetailCardLeft>
        <DetailCardRight>
          <span className="text-black dark:text-white">Content Right</span>
        </DetailCardRight>
      </>
    ),
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
