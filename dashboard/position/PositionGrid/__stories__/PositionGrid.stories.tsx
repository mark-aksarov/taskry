import { PositionGrid } from "../PositionGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionGridExample } from "./PositionGridExample";
import { DeletePositionsProvider } from "../../DeletePositionsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/PositionGrid",
  component: PositionGrid,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeletePositionsProvider>
          <Story />
        </DeletePositionsProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof PositionGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <PositionGridExample />,
  },
} satisfies Story;
