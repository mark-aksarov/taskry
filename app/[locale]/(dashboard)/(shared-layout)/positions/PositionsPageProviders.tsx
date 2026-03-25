import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreatePositionProvider } from "@/components/position/CreatePositionProvider";
import { CreatePositionModalProvider } from "@/components/position/CreatePositionModal";
import { DeletePositionsProvider } from "@/components/position/DeletePositionsProvider";

interface PositionsPageProvidersProps {
  pageItems: SelectedItem[];
  children: React.ReactNode;
}

export function PositionsPageProviders({
  pageItems,
  children,
}: PositionsPageProvidersProps) {
  return (
    <SelectedItemsProvider pageItems={pageItems}>
      <DeletePositionsProvider>
        <CreatePositionModalProvider>
          <CreatePositionProvider>{children}</CreatePositionProvider>
        </CreatePositionModalProvider>
      </DeletePositionsProvider>
    </SelectedItemsProvider>
  );
}
