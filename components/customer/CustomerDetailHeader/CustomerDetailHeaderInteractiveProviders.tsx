import { UpdateCustomerImageProvider } from "../UpdateCustomerImageProvider";
import { UpdateCustomerImageModalProvider } from "../UpdateCustomerImageModal";
import { ClearCustomerImageUrlProvider } from "../ClearCustomerImageUrlProvider";
import { UpdateCustomerImageFileProvider } from "../UpdateCustomerImageFileContext";

export function CustomerDetailHeaderInteractiveProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateCustomerImageModalProvider>
      <UpdateCustomerImageFileProvider>
        <UpdateCustomerImageProvider>
          <ClearCustomerImageUrlProvider>
            {children}
          </ClearCustomerImageUrlProvider>
        </UpdateCustomerImageProvider>
      </UpdateCustomerImageFileProvider>
    </UpdateCustomerImageModalProvider>
  );
}
