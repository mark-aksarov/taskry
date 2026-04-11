import { UpdateUserAddressContext } from "../../UpdateUserAddressContext";

export const MockedUpdateUserAddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserAddressContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserAddressContext.Provider>
  );
};
