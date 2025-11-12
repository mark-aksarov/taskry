import { Heart } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { DashboardCardIcon } from "./DashboardCardIcon";
import { DashboardCardValue } from "./DashboardCardValue";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardCardText } from "./DashboardCardText";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/dashboard/DashboardCard",
  component: DashboardCard,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
  args: {
    text: <DashboardCardText>Dashboard card text</DashboardCardText>,
    icon: (
      <DashboardCardIcon color="blue">
        <Heart size={24} strokeWidth={2} absoluteStrokeWidth />
      </DashboardCardIcon>
    ),
    value: <DashboardCardValue>20</DashboardCardValue>,
  },
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
