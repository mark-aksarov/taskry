import { UpdateClientPhoneNumberContext } from "../../UpdateClientPhoneNumberContext";

export const MockedUpdateClientPhoneNumberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientPhoneNumberContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientPhoneNumberContext.Provider>
  );
};
