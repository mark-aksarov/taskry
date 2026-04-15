import { mocked } from "storybook/test";
import AppCustomerDetailLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailAlt } from "@/components/customer/CustomerDetailAlt";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { CustomerDetailHeaderInteractive } from "@/components/customer/CustomerDetailHeader";
import { withDeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider/__stories__";
import { withUpdateCustomerBioProvider } from "@/components/customer/UpdateCustomerBioProvider/__stories__";
import { withUpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider/__stories__";
import { withUpdateCustomerEmailProvider } from "@/components/customer/UpdateCustomerEmailProvider/__stories__";
import { withClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider/__stories__";
import { withUpdateCustomerCompanyProvider } from "@/components/customer/UpdateCustomerCompanyProvider/__stories__";
import { withUpdateCustomerFullNameProvider } from "@/components/customer/UpdateCustomerFullNameProvider/__stories__";
import { withUpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext/__stories__";
import { withUpdateCustomerPublicLinkProvider } from "@/components/customer/UpdateCustomerPublicLinkProvider/__stories__";
import { withUpdateCustomerPhoneNumberProvider } from "@/components/customer/UpdateCustomerPhoneNumberProvider/__stories__";

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
    SharedPageDecorator,
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
