import {
  ClientDetailActions,
  ClientDetailActionsSkeleton,
} from "../ClientDetailActions";

import { ClientDetailAlt } from "../ClientDetailAlt";
import { mockedClientDetail } from "@/mocks/clients";
import { ClientDetailCard } from "./ClientDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientDetailAltSkeleton } from "../ClientDetailAlt";
import { DeleteClientProvider } from "../DeleteClientContext";
import { UpdateClientBioProvider } from "../UpdateClientBioContext";
import { ClientDetailHeaderInteractive } from "../ClientDetailHeader";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { UpdateClientImageProvider } from "../UpdateClientImageContext";
import { UpdateClientEmailProvider } from "../UpdateClientEmailContext";
import { UpdateClientCompanyProvider } from "../UpdateClientCompanyContext";
import { UpdateClientFullNameProvider } from "../UpdateClientFullNameContext";
import { UpdateClientImageFileProvider } from "../UpdateClientImageFileContext";
import { UpdateClientPublicLinkProvider } from "../UpdateClientPublicLinkContext";
import { UpdateClientPhoneNumberProvider } from "../UpdateClientPhoneNumberContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientDetailCard",
  component: ClientDetailCard,
  decorators: [
    (Story) => (
      <UpdateClientImageFileProvider>
        <UpdateClientImageProvider>
          <DeleteClientProvider>
            <UpdateClientBioProvider>
              <UpdateClientFullNameProvider>
                <UpdateClientPhoneNumberProvider>
                  <UpdateClientPublicLinkProvider>
                    <UpdateClientEmailProvider>
                      <UpdateClientCompanyProvider>
                        <Story />
                      </UpdateClientCompanyProvider>
                    </UpdateClientEmailProvider>
                  </UpdateClientPublicLinkProvider>
                </UpdateClientPhoneNumberProvider>
              </UpdateClientFullNameProvider>
            </UpdateClientBioProvider>
          </DeleteClientProvider>
        </UpdateClientImageProvider>
      </UpdateClientImageFileProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof ClientDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientDetailContainer: <ClientDetailAlt {...mockedClientDetail} />,
    clientDetailHeaderContainer: (
      <ClientDetailHeaderInteractive
        clientId={mockedClientDetail.id}
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
      <ClientDetailHeaderInteractive
        clientId={mockedClientDetail.id}
        fullName={mockedClientDetail.fullName}
      />
    ),
    clientDetailActions: <ClientDetailActions />,
  },
} satisfies Story;
