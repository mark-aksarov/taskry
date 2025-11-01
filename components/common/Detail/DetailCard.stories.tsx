import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailCard } from "./DetailCard";
import { DetailCardHeader } from "./DetailCardHeader";
import { DetailCardTitle } from "./DetailCardTitle";
import { DetailPanel } from "../DetailPanel";
import { DetailCardLeft } from "./DetailCardLeft";

const meta = {
  title: "Components/common/DetailCard",
  component: DetailCard,
  tags: ["autodocs"],
  args: {
    children: null,
  },
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DetailCard>
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>Detail Card</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6 text-black dark:text-white">Detail Card Body</div>
      </DetailCardLeft>
      <DetailPanel>
        <div className="text-black dark:text-white">Detail Panel</div>
      </DetailPanel>
    </DetailCard>
  ),
};
