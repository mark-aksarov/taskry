import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { UserFiltersModal } from "../UserFiltersModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersProvider } from "../UserFiltersContext/__stories__";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserFiltersModal",
  component: UserFiltersModal,
  decorators: [
    withOpenModal,
    withUserFiltersProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
