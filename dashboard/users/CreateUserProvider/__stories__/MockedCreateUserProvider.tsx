import { CreateUserContext } from "../../CreateUserContext";

export const MockedCreateUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};
