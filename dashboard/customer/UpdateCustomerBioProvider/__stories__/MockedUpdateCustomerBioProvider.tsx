import { UpdateCustomerBioContext } from "../../UpdateCustomerBioContext";

export const MockedUpdateCustomerBioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCustomerBioContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerBioContext.Provider>
  );
};
