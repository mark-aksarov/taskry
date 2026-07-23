import { ImportClientsContext } from "../../ImportClientsContext";

export const MockedImportClientsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportClientsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportClientsContext.Provider>
  );
};
