import { UserFiltersForm } from "./UserFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersFormPositionCheckboxGroup } from "./UserFiltersFormPositionCheckboxGroup";

const meta: Meta<typeof UserFiltersForm> = {
  title: "Components/users/UserFiltersForm",
  component: UserFiltersForm,
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filters: { position: [] },
    positionCheckboxGroup: (
      <UserFiltersFormPositionCheckboxGroup
        filters={{ position: [] }}
        positions={[
          {
            id: 1,
            name: "Founder",
          },
          {
            id: 2,
            name: "Manager",
          },
          {
            id: 3,
            name: "Designer",
          },
          {
            id: 4,
            name: "Developer",
          },
        ]}
      />
    ),
  },
} satisfies Story;
