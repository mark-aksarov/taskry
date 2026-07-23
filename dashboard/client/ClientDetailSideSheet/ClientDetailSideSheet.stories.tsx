import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { ClientDetailHeader } from "../ClientDetailHeader";
import { ClientDetail } from "../ClientDetail/ClientDetail";
import { ClientDetailSideSheet } from "./ClientDetailSideSheet";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ClientDetailSkeleton } from "../ClientDetail/ClientDetailSkeleton";

const meta = {
  title: "dashboard/clients/ClientDetailSideSheet",
  component: ClientDetailSideSheet,
  decorators: [withOpenModal, withModalManagerProvider, withThemedBackground],
  parameters: {
    modalId: "clientDetail",
  },
} satisfies Meta<typeof ClientDetailSideSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientDetailContainer: <ClientDetail {...mockedClientDetail} />,
    clientDetailHeaderContainer: (
      <ClientDetailHeader
        fullName={mockedClientDetail.fullName}
        imageUrl={mockedClientDetail.imageUrl}
        companyName={mockedClientDetail.company.name}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    clientId: mockedClientDetail.id,
    clientDetailContainer: <ClientDetailSkeleton />,
    clientDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;
