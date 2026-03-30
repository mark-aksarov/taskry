import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { MockedDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { MockedUpdateUserProvider } from "../../UpdateUserProvider/__stories__";

export function MockedUserItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalManagerProvider>
      <MockedDeleteUserProvider>
        <MockedUpdateUserProvider>{children}</MockedUpdateUserProvider>
      </MockedDeleteUserProvider>
    </ModalManagerProvider>
  );
}
