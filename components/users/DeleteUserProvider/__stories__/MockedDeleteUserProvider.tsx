import { DeleteUserContext } from "../../DeleteUserContext";

export const MockedDeleteUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteUserContext.Provider>
  );
};
