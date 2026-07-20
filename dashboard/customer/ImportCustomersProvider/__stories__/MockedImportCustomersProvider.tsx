import { ImportCustomersContext } from "../../ImportCustomersContext";

export const MockedImportCustomersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportCustomersContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportCustomersContext.Provider>
  );
};
