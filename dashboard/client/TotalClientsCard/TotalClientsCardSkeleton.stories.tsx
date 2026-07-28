import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalClientsCardSkeleton } from "./TotalClientsCardSkeleton";

const meta = {
  title: "dashboard/clients/TotalClientsCardSkeleton",
  component: TotalClientsCardSkeleton,
} satisfies Meta<typeof TotalClientsCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
