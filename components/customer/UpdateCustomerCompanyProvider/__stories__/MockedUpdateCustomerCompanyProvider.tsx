import { UpdateCustomerCompanyContext } from "../../UpdateCustomerCompanyContext";

export const MockedUpdateCustomerCompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerCompanyContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerCompanyContext.Provider>
  );
};
