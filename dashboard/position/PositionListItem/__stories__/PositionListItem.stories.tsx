import { PositionListItem } from "../PositionListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionProvider } from "../../DeletePositionContext";
import { UpdatePositionProvider } from "../../UpdatePositionContext";
import { DeletePositionsProvider } from "../../DeletePositionsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/PositionListItem",
  component: PositionListItem,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <UpdatePositionProvider>
          <DeletePositionProvider>
            <DeletePositionsProvider>
              <Story />
            </DeletePositionsProvider>
          </DeletePositionProvider>
        </UpdatePositionProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof PositionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Position 1",
  },
} satisfies Story;
