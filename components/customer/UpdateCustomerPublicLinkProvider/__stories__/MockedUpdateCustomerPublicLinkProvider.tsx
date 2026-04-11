import { UpdateCustomerPublicLinkContext } from "../../UpdateCustomerPublicLinkContext";

export const MockedUpdateCustomerPublicLinkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerPublicLinkContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerPublicLinkContext.Provider>
  );
};
