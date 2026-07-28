import {
  UpdateUserPositionForm,
  UpdateUserPositionFormSkeleton,
} from "../UpdateUserPositionForm";

import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UpdateUserPositionModal } from "../UpdateUserPositionModal";
import { UpdateUserPositionProvider } from "../UpdateUserPositionContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserPositionModal",
  component: UpdateUserPositionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserPositionProvider>
        <Story />
      </UpdateUserPositionProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserPosition",
  },
} satisfies Meta<typeof UpdateUserPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateUserPositionFormContainer: (
      <UpdateUserPositionForm
        userId={mockedUserDetail.id}
        positionId={mockedUserDetail.position.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateUserPositionFormContainer: <UpdateUserPositionFormSkeleton />,
  },
} satisfies Story;
