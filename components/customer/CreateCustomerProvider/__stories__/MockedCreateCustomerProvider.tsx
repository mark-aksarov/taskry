import { CreateCustomerContext } from "../../CreateCustomerContext";

export const MockedCreateCustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateCustomerContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateCustomerContext.Provider>
  );
};
