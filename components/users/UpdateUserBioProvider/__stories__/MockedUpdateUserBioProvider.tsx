import { UpdateUserBioContext } from "../../UpdateUserBioContext";

export const MockedUpdateUserBioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserBioContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserBioContext.Provider>
  );
};
