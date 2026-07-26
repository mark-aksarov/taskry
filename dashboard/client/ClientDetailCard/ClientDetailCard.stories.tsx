import {
  ClientDetailActions,
  ClientDetailActionsSkeleton,
} from "../ClientDetailActions";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientDetailAlt } from "../ClientDetailAlt";
import { mockedClientDetail } from "@/mocks/clients";
import { ClientDetailCard } from "./ClientDetailCard";
import { ClientDetailAltSkeleton } from "../ClientDetailAlt";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ClientDetailHeaderInteractive } from "../ClientDetailHeader";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withDeleteClientProvider } from "@/dashboard/client/DeleteClientProvider/__stories__";
import { withUpdateClientBioProvider } from "@/dashboard/client/UpdateClientBioProvider/__stories__";
import { withUpdateClientImageProvider } from "@/dashboard/client/UpdateClientImageProvider/__stories__";
import { withUpdateClientEmailProvider } from "@/dashboard/client/UpdateClientEmailProvider/__stories__";
import { withClearClientImageUrlProvider } from "@/dashboard/client/ClearClientImageUrlProvider/__stories__";
import { withUpdateClientCompanyProvider } from "@/dashboard/client/UpdateClientCompanyProvider/__stories__";
import { withUpdateClientFullNameProvider } from "@/dashboard/client/UpdateClientFullNameProvider/__stories__";
import { withUpdateClientImageFileProvider } from "@/dashboard/client/UpdateClientImageFileContext/__stories__";
import { withUpdateClientPublicLinkProvider } from "@/dashboard/client/UpdateClientPublicLinkProvider/__stories__";
import { withUpdateClientPhoneNumberProvider } from "@/dashboard/client/UpdateClientPhoneNumberProvider/__stories__";

const meta = {
  title: "dashboard/clients/ClientDetailCard",
  component: ClientDetailCard,
  decorators: [
    withUpdateClientCompanyProvider,
    withUpdateClientEmailProvider,
    withUpdateClientPublicLinkProvider,
    withUpdateClientPhoneNumberProvider,
    withUpdateClientFullNameProvider,
    withUpdateClientBioProvider,
    withDeleteClientProvider,
    withUpdateClientImageProvider,
    withClearClientImageUrlProvider,
    withUpdateClientImageFileProvider,
    withSessionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ClientDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientDetailContainer: <ClientDetailAlt {...mockedClientDetail} />,
    clientDetailHeaderContainer: (
      <ClientDetailHeaderInteractive
        fullName={mockedClientDetail.fullName}
        imageUrl={mockedClientDetail.imageUrl}
        companyName={mockedClientDetail.company.name}
      />
    ),
    clientDetailActions: <ClientDetailActions />,
  },
} satisfies Story;

export const Loading = {
  args: {
    clientDetailContainer: <ClientDetailAltSkeleton />,
    clientDetailHeaderContainer: <DetailHeaderSkeleton />,
    clientDetailActions: <ClientDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    clientDetailContainer: (
      <ClientDetailAlt
        fullName={mockedClientDetail.fullName}
        email={mockedClientDetail.email}
      />
    ),
    clientDetailHeaderContainer: (
      <ClientDetailHeaderInteractive fullName={mockedClientDetail.fullName} />
    ),
    clientDetailActions: <ClientDetailActions />,
  },
} satisfies Story;
