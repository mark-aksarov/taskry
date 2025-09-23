import { Heart } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { CardHeading } from "@/components/common/Card";
import { DashboardCardStat } from "./DashboardCardStat";
import { DashboardCardIcon } from "./DashboardCardIcon";
import { DashboardCardValue } from "./DashboardCardValue";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/common/DashboardCard",
  component: DashboardCard,
  tags: ["autodocs"],
  args: {
    className: "h-[160px] w-[400px]",
  },
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncreasingStat = {
  render: (args) => (
    <DashboardCard
      heading={<CardHeading>Dashboard heading</CardHeading>}
      icon={
        <DashboardCardIcon color="blue">
          <Heart size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>20</DashboardCardValue>}
      stat={<DashboardCardStat value={20} prevValue={16} />}
      {...args}
    />
  ),
} satisfies Story;

export const DecreasingStat = {
  render: (args) => (
    <DashboardCard
      heading={<CardHeading>Dashboard heading</CardHeading>}
      icon={
        <DashboardCardIcon color="blue">
          <Heart size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>16</DashboardCardValue>}
      stat={<DashboardCardStat value={16} prevValue={20} />}
      {...args}
    />
  ),
} satisfies Story;

export const OrangeIcon = {
  render: (args) => (
    <DashboardCard
      heading={<CardHeading>Dashboard heading</CardHeading>}
      icon={
        <DashboardCardIcon color="orange">
          <Heart size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>16</DashboardCardValue>}
      stat={<DashboardCardStat value={16} prevValue={20} />}
      {...args}
    />
  ),
} satisfies Story;

export const GreenIcon = {
  render: (args) => (
    <DashboardCard
      heading={<CardHeading>Dashboard heading</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <Heart size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>16</DashboardCardValue>}
      stat={<DashboardCardStat value={16} prevValue={20} />}
      {...args}
    />
  ),
} satisfies Story;

export const WithProgress = {
  render: (args) => (
    <DashboardCard
      heading={<CardHeading>Dashboard heading</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <Heart size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>150</DashboardCardValue>}
      progress={
        <ProgressBar
          textClassName="text-sm! font-normal"
          label="150 / 200"
          value={75}
        />
      }
      {...args}
    />
  ),
} satisfies Story;
