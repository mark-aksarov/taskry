import { UpdateUserContext } from "../../UpdateUserContext";

export const MockedUpdateUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserContext.Provider>
  );
};
