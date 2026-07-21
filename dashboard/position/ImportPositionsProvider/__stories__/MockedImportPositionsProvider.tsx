import { ImportPositionsContext } from "../../ImportPositionsContext";

export const MockedImportPositionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportPositionsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportPositionsContext.Provider>
  );
};
