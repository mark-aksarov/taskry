import { DeleteCustomerContext } from "../DeleteCustomerContext";

export const MockedDeleteCustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteCustomerContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteCustomerContext.Provider>
  );
};
