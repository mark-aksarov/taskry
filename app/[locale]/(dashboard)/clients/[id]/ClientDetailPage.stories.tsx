import { mocked } from "storybook/test";
import AppClientDetailLoading from "./loading";
import AppClientDetailNotFound from "./not-found";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedClientDetail } from "@/mocks/clients";
import { ClientDetailPage } from "./ClientDetailPage";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ClientDetailAlt } from "@/dashboard/client/ClientDetailAlt";
import { ClientDetailActions } from "@/dashboard/client/ClientDetailActions";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { ClientDetailHeaderInteractive } from "@/dashboard/client/ClientDetailHeader";
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
  title: "pages/ClientDetailPage",
  component: ClientDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
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
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/clients/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof ClientDetailPage>;

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
  args: { ...Default.args },
  render: () => <AppClientDetailLoading />,
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
        fullName={mockedClientDetail.fullName}
      />
    ),
    clientDetailActions: <ClientDetailActions />,
  },
} satisfies Story;

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppClientDetailNotFound />,
} satisfies Story;
