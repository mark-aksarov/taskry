import { UpdateSubtaskModalProvider } from "../../UpdateSubtaskModal";
import { MockedDeleteSubtaskProvider } from "../../DeleteSubtaskProvider/__stories__";
import { MockedToggleSubtaskProvider } from "../../ToggleSubtaskProvider/__stories__";
import { MockedUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";

export function MockedSubtaskProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedDeleteSubtaskProvider>
      <UpdateSubtaskModalProvider>
        <MockedUpdateSubtaskProvider>
          <MockedToggleSubtaskProvider>{children}</MockedToggleSubtaskProvider>
        </MockedUpdateSubtaskProvider>
      </UpdateSubtaskModalProvider>
    </MockedDeleteSubtaskProvider>
  );
}
