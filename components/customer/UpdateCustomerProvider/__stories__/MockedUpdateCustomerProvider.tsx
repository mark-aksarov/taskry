import { UpdateCustomerContext } from "../../UpdateCustomerContext";

export const MockedUpdateCustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerContext.Provider>
  );
};
