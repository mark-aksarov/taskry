import { UpdateCustomerImageModalProvider } from "../../UpdateCustomerImageModal";
import { UpdateCustomerImageFileProvider } from "../../UpdateCustomerImageFileContext";
import { MockedUpdateCustomerImageProvider } from "../../UpdateCustomerImageContext/__stories__";
import { MockedClearCustomerImageUrlProvider } from "../../ClearCustomerImageUrlProvider/__stories__";

export function MockedCustomerDetailHeaderProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateCustomerImageModalProvider>
      <UpdateCustomerImageFileProvider>
        <MockedClearCustomerImageUrlProvider>
          <MockedUpdateCustomerImageProvider>
            {children}
          </MockedUpdateCustomerImageProvider>
        </MockedClearCustomerImageUrlProvider>
      </UpdateCustomerImageFileProvider>
    </UpdateCustomerImageModalProvider>
  );
}
