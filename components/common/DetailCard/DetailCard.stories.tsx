import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailCard } from "./DetailCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DetailCardHeader } from "./DetailCardHeader";
import { DetailCardHeading } from "./DetailCardHeading";
import { DetailCardBody } from "./DetailCardBody";
import { DetailCardLeft } from "./DetailCardLeft";
import { DetailCardRight } from "./DetailCardRight";

const meta = {
  title: "Components/common/DetailCard",
  component: DetailCard,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <DetailCard>
        <DetailCardHeader>
          <DetailCardHeading>Detail Card</DetailCardHeading>
        </DetailCardHeader>
        <DetailCardBody>
          <DetailCardLeft>
            <span className="text-black dark:text-white">Detail Card Left</span>
          </DetailCardLeft>
          <DetailCardRight>
            <span className="w-[350px] text-black dark:text-white">
              Detail Card Right
            </span>
          </DetailCardRight>
        </DetailCardBody>
      </DetailCard>
    ),
  },
} satisfies Story;
