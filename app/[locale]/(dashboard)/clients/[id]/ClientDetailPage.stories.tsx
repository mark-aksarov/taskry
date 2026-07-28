import { mocked } from "storybook/test";
import AppClientDetailLoading from "./loading";
import AppClientDetailNotFound from "./not-found";
import { mockedClientDetail } from "@/mocks/clients";
import { ClientDetailPage } from "./ClientDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientDetailAlt } from "@/dashboard/client/ClientDetailAlt";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { ClientDetailActions } from "@/dashboard/client/ClientDetailActions";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { UpdateClientCompanyForm } from "@/dashboard/client/UpdateClientCompanyForm";
import { ClientDetailHeaderInteractive } from "@/dashboard/client/ClientDetailHeader";

const meta = {
  title: "pages/ClientDetailPage",
  component: ClientDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
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
    client: mockedClientDetail,
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
    updateClientCompanyFormContainer: (
      <UpdateClientCompanyForm
        clientId={mockedClientDetail.id}
        companyId={mockedClientDetail.company.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppClientDetailLoading />,
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
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

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppClientDetailNotFound />,
} satisfies Story;
