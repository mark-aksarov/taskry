import { UpdateCustomerEmailContext } from "../../UpdateCustomerEmailContext";

export const MockedUpdateCustomerEmailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerEmailContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerEmailContext.Provider>
  );
};
