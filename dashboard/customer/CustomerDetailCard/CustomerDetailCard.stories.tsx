import {
  CustomerDetailActions,
  CustomerDetailActionsSkeleton,
} from "../CustomerDetailActions";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailAlt } from "../CustomerDetailAlt";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailAltSkeleton } from "../CustomerDetailAlt";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailHeaderInteractive } from "../CustomerDetailHeader";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
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
  title: "dashboard/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [
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
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerDetailCard>;

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
  args: {
    customerDetailContainer: <CustomerDetailAltSkeleton />,
    customerDetailHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: <CustomerDetailActionsSkeleton />,
  },
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
