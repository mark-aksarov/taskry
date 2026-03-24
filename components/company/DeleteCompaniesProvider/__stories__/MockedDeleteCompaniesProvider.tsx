import { DeleteCompaniesContext } from "../../DeleteCompaniesContext";

export const MockedDeleteCompaniesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteCompaniesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteCompaniesContext.Provider>
  );
};
