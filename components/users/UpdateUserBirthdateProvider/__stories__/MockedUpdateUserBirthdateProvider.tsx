import { UpdateUserBirthdateContext } from "../../UpdateUserBirthdateContext";

export const MockedUpdateUserBirthdateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserBirthdateContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserBirthdateContext.Provider>
  );
};
