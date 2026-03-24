import { DeleteCompanyContext } from "../DeleteCompanyContext";

export const MockedDeleteCompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteCompanyContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteCompanyContext.Provider>
  );
};
