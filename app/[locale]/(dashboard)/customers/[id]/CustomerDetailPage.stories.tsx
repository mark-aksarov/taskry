import { mocked } from "storybook/test";
import AppCustomerDetailLoading from "./loading";
import AppCustomerDetailNotFound from "./not-found";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailAlt } from "@/dashboard/customer/CustomerDetailAlt";
import { CustomerDetailActions } from "@/dashboard/customer/CustomerDetailActions";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { CustomerDetailHeaderInteractive } from "@/dashboard/customer/CustomerDetailHeader";
import { withDeleteCustomerProvider } from "@/dashboard/customer/DeleteCustomerProvider/__stories__";
import { withUpdateCustomerBioProvider } from "@/dashboard/customer/UpdateCustomerBioProvider/__stories__";
import { withUpdateCustomerImageProvider } from "@/dashboard/customer/UpdateCustomerImageProvider/__stories__";
import { withUpdateCustomerEmailProvider } from "@/dashboard/customer/UpdateCustomerEmailProvider/__stories__";
import { withClearCustomerImageUrlProvider } from "@/dashboard/customer/ClearCustomerImageUrlProvider/__stories__";
import { withUpdateCustomerCompanyProvider } from "@/dashboard/customer/UpdateCustomerCompanyProvider/__stories__";
import { withUpdateCustomerFullNameProvider } from "@/dashboard/customer/UpdateCustomerFullNameProvider/__stories__";
import { withUpdateCustomerImageFileProvider } from "@/dashboard/customer/UpdateCustomerImageFileContext/__stories__";
import { withUpdateCustomerPublicLinkProvider } from "@/dashboard/customer/UpdateCustomerPublicLinkProvider/__stories__";
import { withUpdateCustomerPhoneNumberProvider } from "@/dashboard/customer/UpdateCustomerPhoneNumberProvider/__stories__";

const meta = {
  title: "pages/CustomerDetailPage",
  component: CustomerDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateCustomerCompanyProvider,
    withUpdateCustomerEmailProvider,
    withUpdateCustomerPublicLinkProvider,
    withUpdateCustomerPhoneNumberProvider,
    withUpdateCustomerFullNameProvider,
    withUpdateCustomerBioProvider,
    withDeleteCustomerProvider,
    withUpdateCustomerImageProvider,
    withClearCustomerImageUrlProvider,
    withUpdateCustomerImageFileProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof CustomerDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerDetailContainer: <CustomerDetailAlt {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderInteractive
        fullName={mockedCustomerDetail.fullName}
        imageUrl={mockedCustomerDetail.imageUrl}
        companyName={mockedCustomerDetail.company.name}
      />
    ),
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppCustomerDetailLoading />,
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: (
      <CustomerDetailAlt
        fullName={mockedCustomerDetail.fullName}
        email={mockedCustomerDetail.email}
      />
    ),
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderInteractive
        fullName={mockedCustomerDetail.fullName}
      />
    ),
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppCustomerDetailNotFound />,
} satisfies Story;
