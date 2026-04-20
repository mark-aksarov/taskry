import { UpdateCustomerPhoneNumberContext } from "../../UpdateCustomerPhoneNumberContext";

export const MockedUpdateCustomerPhoneNumberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerPhoneNumberContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerPhoneNumberContext.Provider>
  );
};
