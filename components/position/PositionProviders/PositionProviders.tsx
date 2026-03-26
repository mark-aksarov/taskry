import { DeletePositionModalProvider } from "../DeletePositionModal";
import { DeletePositionProvider } from "../DeletePositionProvider";
import { UpdatePositionModalProvider } from "../UpdatePositionModal";
import { UpdatePositionProvider } from "../UpdatePositionProvider";

interface ProjectItemProvidersProps {
  children: React.ReactNode;
}

export function PositionProviders({ children }: ProjectItemProvidersProps) {
  return (
    <UpdatePositionModalProvider>
      <UpdatePositionProvider>
        <DeletePositionModalProvider>
          <DeletePositionProvider>{children}</DeletePositionProvider>
        </DeletePositionModalProvider>
      </UpdatePositionProvider>
    </UpdatePositionModalProvider>
  );
}
