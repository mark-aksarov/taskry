import {
  UserPositionFiltersForm,
  UserPositionFiltersFormSkeleton,
} from "../UserPositionFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserFiltersProvider } from "../UserFiltersContext";
import { UserPositionFiltersModal } from "./UserPositionFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserPositionFiltersModal",
  component: UserPositionFiltersModal,
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
    modalId: "userPositionFilters",
  },
} satisfies Meta<typeof UserPositionFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <UserPositionFiltersForm
        positionCheckboxGroupItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <UserPositionFiltersFormSkeleton />,
  },
} satisfies Story;
