import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersForm } from "./UserFiltersForm";
import { mocked } from "storybook/test";
import { getPositions } from "@/lib/queries/user";
import { positionsMock } from "../positionsMock";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";

const meta: Meta<typeof UserFiltersForm> = {
  title: "Components/users/UserFiltersForm",
  component: UserFiltersForm,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getPositions).mockReturnValue(
      new Promise((res) => res(positionsMock)),
    );
  },
  render: (args) => {
    const positionsPromise = getPositions(1);

    return (
      <UserFiltersForm
        {...args}
        positionCheckboxGroup={
          <PositionCheckboxGroup positionsPromise={positionsPromise} />
        }
      />
    );
  },
} satisfies Meta<typeof UserFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
