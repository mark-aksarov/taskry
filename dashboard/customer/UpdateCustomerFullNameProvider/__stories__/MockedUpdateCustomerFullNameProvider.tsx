import { UpdateCustomerFullNameContext } from "../../UpdateCustomerFullNameContext";

export const MockedUpdateCustomerFullNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerFullNameContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerFullNameContext.Provider>
  );
};
