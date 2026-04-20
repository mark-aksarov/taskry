import { UpdateUserPhoneNumberContext } from "../../UpdateUserPhoneNumberContext";

export const MockedUpdateUserPhoneNumberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserPhoneNumberContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserPhoneNumberContext.Provider>
  );
};
