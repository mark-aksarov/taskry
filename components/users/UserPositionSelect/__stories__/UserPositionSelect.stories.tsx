import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserPositionSelect } from "../UserPositionSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserPositionSelect",
  component: UserPositionSelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserPositionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positions: [
      { id: 1, name: "Position 1" },
      { id: 2, name: "Position 2" },
      { id: 3, name: "Position 3" },
    ],
  },
} satisfies Story;
