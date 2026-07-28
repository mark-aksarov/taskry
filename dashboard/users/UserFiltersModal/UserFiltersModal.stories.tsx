import { withOpenModal } from "@/.storybook/withOpenModal";
import { UserFiltersModal } from "../UserFiltersModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserFiltersProvider } from "../UserFiltersContext";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserFiltersModal",
  component: UserFiltersModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UserFiltersProvider filters={{}}>
        <Story />
      </UserFiltersProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "userFilters",
  },
} satisfies Meta<typeof UserFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <UserFiltersFormSkeleton />,
  },
} satisfies Story;
