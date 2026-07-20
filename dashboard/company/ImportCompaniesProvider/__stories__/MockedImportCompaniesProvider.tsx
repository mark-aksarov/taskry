import { ImportCompaniesContext } from "../../ImportCompaniesContext";

export const MockedImportCompaniesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportCompaniesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportCompaniesContext.Provider>
  );
};
