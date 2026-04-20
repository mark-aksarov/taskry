import { SelectedItemsProvider } from "../SelectedItemsContext";

export function MockedSelectedItemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectedItemsProvider pageItems={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
      {children}
    </SelectedItemsProvider>
  );
}
