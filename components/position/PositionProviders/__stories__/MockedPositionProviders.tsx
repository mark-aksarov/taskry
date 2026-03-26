import { UpdatePositionModalProvider } from "../../UpdatePositionModal";
import { MockedUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";
import { MockedDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { DeletePositionModalProvider } from "../../DeletePositionModal";

export function MockedPositionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdatePositionModalProvider>
      <MockedUpdatePositionProvider>
        <DeletePositionModalProvider>
          <MockedDeletePositionProvider>
            {children}
          </MockedDeletePositionProvider>
        </DeletePositionModalProvider>
      </MockedUpdatePositionProvider>
    </UpdatePositionModalProvider>
  );
}
