import { UpdateUserImageModalProvider } from "../../UpdateUserImageModal";
import { UpdateUserImageFileProvider } from "../../UpdateUserImageFileContext";
import { MockedUpdateUserImageProvider } from "../../UpdateUserImageProvider/__stories__";
import { MockedClearUserImageUrlProvider } from "../../ClearUserImageUrlProvider/__stories__";

export function MockedUserDetailHeaderProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateUserImageModalProvider>
      <UpdateUserImageFileProvider>
        <MockedClearUserImageUrlProvider>
          <MockedUpdateUserImageProvider>
            {children}
          </MockedUpdateUserImageProvider>
        </MockedClearUserImageUrlProvider>
      </UpdateUserImageFileProvider>
    </UpdateUserImageModalProvider>
  );
}
