import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalClientsCard } from "./TotalClientsCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/clients/TotalClientsCard",
  component: TotalClientsCard,
  decorators: [withThemedBackground],
  args: {
    totalClients: 20,
  },
} satisfies Meta<typeof TotalClientsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
