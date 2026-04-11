import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UpdateUserPositionForm } from "../UpdateUserPositionForm";
import { UpdateUserPositionModal } from "../UpdateUserPositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserPositionProvider } from "../UpdateUserPositionProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserPositionModal",
  component: UpdateUserPositionModal,
  decorators: [
    withOpenModal,
    withUpdateUserPositionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
