import { UpdateUserFullNameContext } from "../../UpdateUserFullNameContext";

export const MockedUpdateUserFullNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserFullNameContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserFullNameContext.Provider>
  );
};
