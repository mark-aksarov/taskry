import {
  UserPositionFiltersForm,
  UserPositionFiltersFormSkeleton,
} from "../UserPositionFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserPositionFiltersModal } from "./UserPositionFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersProvider } from "../UserFiltersContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/users/UserPositionFiltersModal",
  component: UserPositionFiltersModal,
  decorators: [
    withOpenModal,
    withUserFiltersProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
