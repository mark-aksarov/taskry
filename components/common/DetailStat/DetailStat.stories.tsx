import { Heart } from "lucide-react";
import { DetailStat, DetailStatSkeleton } from "./DetailStat";
import { DetailStatText } from "./DetailStatText";
import { DetailStatIcon } from "./DetailStatIcon";
import { DetailStatValue } from "./DetailStatValue";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/DetailStat",
  component: DetailStat,
  decorators: [withThemedBackground],
  args: {
    text: <DetailStatText>Detail stat text</DetailStatText>,
    icon: (
      <DetailStatIcon>
        <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />
      </DetailStatIcon>
    ),
    value: <DetailStatValue>20</DetailStatValue>,
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof DetailStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Skeleton = {
  render: () => <DetailStatSkeleton />,
} satisfies Story;
